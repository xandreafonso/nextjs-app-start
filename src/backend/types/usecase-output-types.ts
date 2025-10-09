

export type OutputMessage = {
    type: "info" | "warning" | "error"
    code: string
    content: string
    input?: unknown
    field?: string
}

export type OutputType = "ok" | "client_error" | "server_error"

export type Output<T> = {
    data?: T

    messages?: OutputMessage[]

    type: OutputType
}