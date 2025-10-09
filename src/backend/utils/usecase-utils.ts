import { Output, OutputMessage } from "../types/usecase-output-types";


export const usecaseUtils = {
    okOutput: <T>(data: T, messages?: OutputMessage[]): Output<T> => ({
        data,
        messages,
        type: "ok"
    }),

    clientErrorOutput: (messages: OutputMessage[]): Output<unknown> => ({
        messages,
        type: "client_error"
    }),

    notFoundOutput: (content: string, field?: string, input?: any): Output<unknown> => ({
        messages: [{ type: "warning", code: "not_found", content, field, input  }],
        type: "client_error"
    }),
}