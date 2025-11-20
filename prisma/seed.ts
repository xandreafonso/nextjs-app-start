import { prisma } from "@/backend/libs/prisma"
import { auth } from "@/backend/libs/auth";

async function signUps() {
    const { user } = await auth.api.signUpEmail({
        body: {
            email: "afonsoaaf@gmail.com",
            name: "Alexandre Afonso",
            password: "1234",
        },
    })

    return user
}

async function providersAndCredentials() {
    const [facebookProvider, googleProvider, hotmartProvider] = await Promise.all([
        await prisma.provider.create({
            data: {
                name: "Facebook",
                description: "Facebook OAuth provider",
                icon: "facebook",
                type: "oauth",
                schema: [ 
                    { name: 'client_id', label: 'Client ID', type: 'text', component: 'input', required: true },
                    { name: 'client_secret', label: 'Client Secret', type: 'password', component: 'input', required: true }
                ],
            }
        }),

        await prisma.provider.create({
            data: {
                name: "Google",
                description: "Google OAuth provider",
                icon: "google",
                type: "oauth",
                schema: [ 
                    { name: 'client_id', label: 'Client ID', type: 'text', component: 'input', required: true },
                    { name: 'client_secret', label: 'Client Secret', type: 'password', component: 'input', required: true }
                ],
            }
        }),

        await prisma.provider.create({
            data: {
                name: "Hotmart",
                description: "Hotmart API",
                icon: "hotmart",
                type: "api_key",
                schema: [ 
                    { name: 'api_key', label: 'API Key', type: 'text', component: 'password', required: true }
                ],
            }
        }),
    ])

    const [facebook, google, hotmart] = await Promise.all([
        await prisma.credential.create({
            data: {
                provider: {
                    connect: { id: facebookProvider.id }
                },

                name: "Facebook App",
                description: "Facebook App Credential",
                
                config: {
                    client_id: "your_facebook_client_id",
                    client_secret: "your_facebook_client_secret",
                },
            }
        }),

        await prisma.credential.create({
            data: {
                provider: {
                    connect: { id: googleProvider.id }
                },

                name: "Google App",
                description: "Google App Credential",

                config: {
                    client_id: "your_google_client_id",
                    client_secret: "your_google_client_secret",
                },
            }
        }),

        await prisma.credential.create({
            data: {
                provider: {
                    connect: { id: hotmartProvider.id }
                },

                name: "Hotmart Key",
                description: "Hotmart API Key",
                
                config: {
                    api_key: "your_hotmart_api_key",
                },
            }
        }),
    ])

    return [{ facebookProvider, googleProvider, hotmartProvider }, { facebook, google, hotmart }]
}

async function main() {
    await signUps().then(console.log)
    await providersAndCredentials().then(console.log)
}

main().then(() => console.log("Fim."))