import { Header } from "@/components/header";
import { Main } from "@/components/main";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarInset } from "@/components/ui/sidebar";

export default function VerifiedEmailPage() {
    return (
        <SidebarInset>
            <Header>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>E-mail Verificado</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Header>

            <Main>
                Seu e-mail foi verificado.
            </Main>
        </SidebarInset>
    )
}