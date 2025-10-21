import { DataTable } from "@/components/data-table"
import { credentialColumns } from "./_components/credentials-columns"
import { prisma } from "@/backend/libs/prisma"
import { Header } from "@/components/header";
import { Main } from "@/components/main";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarInset } from "@/components/ui/sidebar";
import { auth } from "@/libs/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CredentialsPage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) redirect("/signin")

    const data = await prisma.credential.findMany({
        include: {
            provider: true,
        }
    })

    return (
        <SidebarInset>
            <Header>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Credentials</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Header>

            <Main>
                <DataTable columns={credentialColumns} data={data} />
            </Main>
        </SidebarInset>
    )
}
