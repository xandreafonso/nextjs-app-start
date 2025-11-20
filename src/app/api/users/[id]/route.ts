import { getUserUseCase } from "@/backend/modules/users/get-user-usecase";
import { resp } from "@/backend/libs/resp";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const output = await getUserUseCase.execute({ id })

    return resp.output(output)
}