import { readFileSync } from "fs"
import path from "path"
import { templateEngine } from "../libs/template-engine"

const domain = process.env.APP_DOMAIN ?? "[Without domain]"

async function verificationEmail({ user, url, token }: { user: any, url: string, token: string }) {
    const templatePath = path.join(process.cwd(), "src/backend", "mails", "verification-email.md")

    const template = readFileSync(templatePath, "utf8")

    const message = await templateEngine.process(template, {
        user,
        url,
        token,
        domain
    })
    
    return message
}

async function resetPassword({ user, url, token }: { user: any, url: string, token: string }) {
    const templatePath = path.join(process.cwd(), "src/backend", "mails", "reset-password.md")

    const template = readFileSync(templatePath, "utf8")

    const message = await templateEngine.process(template, {
        user,
        url,
        token,
        domain
    })
    
    return message
}

export const mailMessageUtils = {
    verificationEmail,
    resetPassword
}