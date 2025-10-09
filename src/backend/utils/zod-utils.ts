import { OutputMessage } from "../types/usecase-output-types"
import { $ZodIssue } from "zod/v4/core"

export const zodUtils = {
    issuesToMessages: (issues: $ZodIssue[]): OutputMessage[] => {
        return issues.map(issue => ({
            type: "warning",
            code: issue.code,
            content: issue.message,
            field: issue.path.join("."),
            input: issue.input
        }))
    }
}