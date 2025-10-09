import { mailersend } from "../libs/mailersend"
import { mailMessageUtils } from "../utils/mail-message-utils"

const MAIL_DEFAULT_FROM_ADDRESS = process.env.MAIL_DEFAULT_FROM_ADDRESS ?? "[Vazio]"
const MAIL_DEFAULT_FROM_NAME = process.env.MAIL_DEFAULT_FROM_NAME ?? "[Vazio]"

export const sendMailService = {

    verificationEmail: async ({ user, url, token }: { user: any, url: string, token: string }) => {
        const message = await mailMessageUtils.verificationEmail({ user, url, token })

        await mailersend.send(
            { name: MAIL_DEFAULT_FROM_NAME, email: MAIL_DEFAULT_FROM_ADDRESS },
            [ { name: user.name, email: user.email } ],
            "Verify your email address",
            message
        )
    },

    resetPassword: async ({ user, url, token }: { user: any, url: string, token: string }) => {
        const message = await mailMessageUtils.resetPassword({ user, url, token })

        await mailersend.send(
            { name: MAIL_DEFAULT_FROM_NAME, email: MAIL_DEFAULT_FROM_ADDRESS },
            [ { name: user.name, email: user.email } ],
            "Reset your password",
            message
        )
    },
}
