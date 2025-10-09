import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export function Header({ children, actions }: { children: React.ReactNode, actions?: React.ReactNode[]  }) {
    return (
        <header className="h-16 px-4 flex justify-between shrink-0 items-center border-b">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />

                <Separator 
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />

                {children}
            </div>

            <div className="flex items-center gap-2">
                {actions?.map(item => item)}

                <ModeToggle />
            </div>
        </header>
    )
}