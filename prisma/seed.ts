import { prisma } from "@/backend/libs/prisma"
import { auth } from "@/libs/auth";

async function signUps() {
    const { user } = await auth.api.signUpEmail({
        body: {
            email: "alexandreferreira@decola.company",
            name: "Alexandre Dev Decola",
            password: "1234",
        },
    })

    return user
}

async function providers() {
    return [
        await prisma.provider.create({
            data: {
                name: "Facebook",
                description: "Facebook OAuth provider",
                icon: "facebook",
                type: "oauth",
                schema: {},
            }
        }),
    ]
}

async function main() {
    await signUps().then(console.log)
    await providers().then(console.log)
}

main().then(() => console.log("Fim."))