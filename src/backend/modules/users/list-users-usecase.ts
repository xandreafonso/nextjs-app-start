import z from "zod"
import { Output } from "../../types/usecase-output-types"
import { usecaseUtils } from "../../utils/usecase-utils"
import { zodUtils } from "../../utils/zod-utils"
import { prisma } from "../../libs/prisma"

const InputSchema = z.object({
    
})

type Input = z.infer<typeof InputSchema>

type Data = {
    id: string
    name: string
    email: string
}[]

class ListUsersUseCase {

    async execute(input: Input): Promise<Output<Data | unknown>> {
        const parsed = InputSchema.safeParse(input)

        if (!parsed.success) {
            return usecaseUtils.clientErrorOutput(zodUtils.issuesToMessages(parsed.error.issues))
        }

        const users = await prisma.user.findMany({ omit: { password: true } })

        return usecaseUtils.okOutput(users)
    }
}

export const listUsersUseCase = new ListUsersUseCase()