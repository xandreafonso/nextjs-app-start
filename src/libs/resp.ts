import { Output } from "@/backend/types/usecase-output-types";
import { NextResponse } from "next/server";

export const resp = {
    output: <T>(output: Output<T>) => {
        if (output.type === "ok") {
            if (output.data) {
                return NextResponse.json(output.data, { status: 200 })
            } else {
                return new NextResponse(null, { status: 204 })
            }
        }

        if (output.type === "client_error") {
            return NextResponse.json(output.messages ?? [{ type: "error", code: "unknown", content: "Unknown client error" }], { status: 400 })
        }

        return NextResponse.json(output.messages ?? [{ type: "error", code: "unknown", content: "Unknown server error" }], { status: 500 })
    },

    file: (data: any, contentType: string, contentDisposition: string) => new NextResponse(data, { headers: { "Content-Type": contentType, "Content-Disposition": contentDisposition } }),

    body: (data: any, contentType: string) => new NextResponse(data, { headers: { "Content-Type": contentType } }),

    json: (data: any, options?: { status?: number }) => NextResponse.json(data, options),

    created: (data: any, options?: ResponseInit) => NextResponse.json(data, { ... options, status: 201}),

    noContent: (options?: ResponseInit) => new NextResponse(null, { ... options, status: 204}),

    redirect: (url: string | URL) => NextResponse.redirect(url),
    
    error400: (messages: { message: string }[]) => NextResponse.json(messages, { status: 400 }),
    
    error404: (message: string) => NextResponse.json([{ message }], { status: 404 }),
    
    error401: () => NextResponse.json([{ message: "Usuário não autenticado" }], { status: 401 }),

    error403: () => NextResponse.json([{ message: "Usuário não autorizado" }], { status: 403 }),

    error500: (messages: { message: string }[]) => NextResponse.json(messages, { status: 500 }),
}