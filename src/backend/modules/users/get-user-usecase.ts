import z from "zod"
import { Output } from "../../types/usecase-output-types"
import { usecaseUtils } from "../../utils/usecase-utils"
import { zodUtils } from "../../utils/zod-utils"
import { prisma } from "../../libs/prisma"

const InputSchema = z.object({
    id: z.string()
})

type Input = z.infer<typeof InputSchema>

type Data = {
    id: string
    name: string
    email: string
}

class GetUserUseCase {

    async execute(input: Input): Promise<Output<Data | unknown>> {
        const parsed = InputSchema.safeParse(input)

        if (!parsed.success) {
            return usecaseUtils.clientErrorOutput(zodUtils.issuesToMessages(parsed.error.issues))
        }

        const { id } = parsed.data

        const user = await prisma.user.findUnique({ where: { id }, omit: { password: true } })

        if (!user) {
            return usecaseUtils.notFoundOutput("User not found", "id", { id })
        }

        return usecaseUtils.okOutput(user)
    }
}

export const getUserUseCase = new GetUserUseCase()