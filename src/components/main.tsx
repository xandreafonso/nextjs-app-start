import { cn } from "@/libs/components-utils";

export function Main({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <main className={cn("h-full p-4 flex flex-col gap-10", className)}>
            {children}
        </main>
    )
}