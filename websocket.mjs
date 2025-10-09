import Fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import fastifyCors from "@fastify/cors";

const fastify = Fastify({
    logger: true,
});

await fastify.register(fastifyCors, {
    origin: "*",
});

await fastify.register(fastifyIO, {
    path: "/websocket/connect",
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const authenticatedUsers = new Map()

async function authenticate(data) {
    return {
        type: "ok",
        
        data,
        
        messages: [],
    };
}

fastify.ready().then(() => {
    fastify.io.on("connection", async (socket) => {
        fastify.log.info(`Nova tentativa de conexão: ${socket.id}`);
        
        socket.on("authenticate", async (data, callback) => {
            fastify.log.info("Tentativa de autenticação:", data);
            
            const output = await authenticate(data);
            
            if (output.type !== "ok") {
                fastify.log.warn(`Autenticação falhou para socket: ${socket.id}`);
                
                callback({ type: output.type, messages: output.messages });
                
                socket.disconnect();
                
                return;
            }
            
            const user = output.data;
            
            socket.user = user;
            
            const socketUser = authenticatedUsers.get(user.id);
            
            if (socketUser) {
                const exists = socketUser.sockets.find((s) => s.id === socket.id)

                if (exists) {
                    fastify.log.warn(`Socket ${socket.id} do usuário ${user.email} já estava autenticado.`)
                } else {
                    socketUser.sockets.push(socket)
                }
            } else {
                authenticatedUsers.set(user.id, {
                    connectedAt: new Date(),
                    user: user,
                    sockets: [socket],
                });
            }
            
            fastify.log.info(`Usuário ${user.email} autenticado.`);
            
            callback({ type: output.type, data: user, messages: output.messages });
        });
        
        socket.on("disconnect", (reason) => {
            if (!socket.user) {
                fastify.log.warn(
                    `Desconexão de socket ${socket.id} não autenticado. Motivo: ${reason}.`
                );
                return;
            }
            
            fastify.log.info(
                `Usuário desconectado ${socket.user.email}. Motivo: ${reason}.`
            );
            
            const socketUser = authenticatedUsers.get(socket.user.id);
            
            if (socketUser) {
                socketUser.sockets = socketUser.sockets.filter(
                    (s) => s.id !== socket.id
                );
                
                if (socketUser.sockets.length === 0) {
                    authenticatedUsers.delete(socket.user.id);
                    
                    fastify.log.info(`Usuário removido ${socket.user.email}.`);
                } else {
                    fastify.log.info(
                        `Dispositivo do usuário ${socket.user.email} removido.`
                    );
                }
            }
        });
    });
});

fastify.get("/socket.io/*", async (request, reply) => {
    return reply.code(404).send({ type: "client_error", code: "404", content: "Path incorreto. Use /websocket/connect para conectar ao WebSocket" });
})

fastify.post("/socket.io/*", async (request, reply) => {
    return reply.code(404).send({ type: "client_error", code: "404", content: "Path incorreto. Use /websocket/connect para conectar ao WebSocket" });
})

fastify.post("/websocket/api/notify", async (request, reply) => {
    const { user, event } = request.body;
    
    const socketUser = authenticatedUsers.get(user.id);
    
    if (!socketUser) {
        return reply.code(404).send({
            type: "client_error",
            message: [
                { type: "warning", code: "404", content: "Usuário não conectado" },
            ],
        });
    }
    
    const emitData = {
        from: "system",
        name: event.name,
        data: event.data,
    };
    
    socketUser.sockets.forEach((socket) => socket.emit("event", emitData));
    
    fastify.log.info(`Mensagem enviada para usuário: ${socketUser.user.email}`);
    
    return reply.code(204).send();
});

fastify.get("/websocket/api/connections", async (request, reply) => {
    const count = authenticatedUsers.size;
    
    return reply.send({ count });
});

const start = async () => {
    try {
        const PORT = process.env.PORT || 3001;
        const HOST = process.env.HOST || "0.0.0.0";
        
        fastify.listen({ port: PORT, host: HOST });
        
        fastify.log.info(`Socket.io pronto.`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();


/*
const script = document.createElement('script');
script.src = 'https://cdn.socket.io/4.6.1/socket.io.min.js';
document.head.appendChild(script);

const socket = io('http://localhost:3001', { path: '/websocket/connect' })

socket.on('connect', console.log)

socket.emit('authenticate', { id: '123', name: 'Alexandre', email: 'afonsoaaf@gmail.com' }, console.log)

socket.on('event', console.log)

socket.disconnect()

socket.connect()

fetch('http://localhost:3001/websocket/api/notify', {
    method: 'post',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        user: { id: '123' }, 
        event: { name: 'test', data: 'Uma mensagem para ser notificada.' }
    })
})
*/