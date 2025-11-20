import { listUsersUseCase } from "@/backend/modules/users/list-users-usecase";
import { resp } from "@/backend/libs/resp";

export async function GET(request: Request) {
    const output = await listUsersUseCase.execute({})

    return resp.output(output)
}