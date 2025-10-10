import { cryptpass } from "@/backend/libs/crypt-pass"
import { prisma } from "@/backend/libs/prisma"
import { sendMailService } from "@/backend/services/send-mail"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { betterAuth } from "better-auth"
import { admin as adminPlugin } from "better-auth/plugins"
import { ac, user, admin } from "./permissions"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    // user: {
    //     additionalFields: {
    //         organizationId: {
    //             type: "string",
    //             required: true,
    //             input: false,
    //         }
    //     },
    // },

    // databaseHooks: {
    //     user: {
    //         create: {
    //             before: async (user, ctx) => { }
    //         }
    //     }
    // },

    // emailVerification: {
    //     sendOnSignUp: true,

    //     autoSignInAfterVerification: true,

    //     sendVerificationEmail: async ({ user, url, token }) => {
    //         console.log(`Send verification email to ${user.email}.`)

    //         return await sendMailService.verificationEmail({ user, url, token })
    //     },

    //     afterEmailVerification: async (user, request) => {
    //         console.log(`${user.email} has been successfully verified!`);
    //     },
    // },

    emailAndPassword: {
        enabled: true,

        minPasswordLength: 4,
        
        password: {
            async hash(password) {
                return await cryptpass.hash(password)
            },

            async verify({ password, hash }: { password: string; hash: string }) {
                return await cryptpass.verify(password, hash)
            }
        },

        sendResetPassword: async ({ user, url, token }) => {
            console.log(`Send reset password email to ${user.email}.`)
            
            return await sendMailService.resetPassword({ user, url, token })
        },

        onPasswordReset: async ({ user }, request) => {
            console.log(`Password for user ${user.email} has been reset.`);
        },
    },

    // https://www.better-auth.com/docs/plugins/admin

    plugins: [adminPlugin({ defaultRole: "user", ac, roles: { user, admin } })],
});
