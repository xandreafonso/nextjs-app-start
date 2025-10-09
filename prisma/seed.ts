import { prisma } from "@/backend/libs/prisma"
import { auth } from "@/libs/auth";

async function signUps() {
    return await auth.api.signUpEmail({
        body: {
            email: "alexandreferreira@decola.company",
            name: "Alexandre Afonso",
            password: "1234",
        },
    })
}

async function main() {
    await signUps().then(console.log)
}

main().then(() => console.log("Fim."))