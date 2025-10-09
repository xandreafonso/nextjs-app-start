import { MailerSend, EmailParams, Sender, Recipient } from "mailersend"
import { markdown } from "./markdown"

const ms = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY ?? "Without key",
})

async function send(sender: { name: string, email: string }, recipients: { name: string, email: string }[], subject: string, body: string) {
    const sentFrom = new Sender(sender.email, sender.name)

    const recipient = recipients.map(r => new Recipient(r.email, r.name))

    const html = `<div style="font-size: 18px; max-width: 600px">${await markdown.toHtml(body)}</div>`

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipient)
        .setReplyTo(sentFrom)
        .setSubject(subject)
        .setHtml(html)
        .setText(body)

    await ms.email.send(emailParams)
}

export const mailersend = {
    send
}