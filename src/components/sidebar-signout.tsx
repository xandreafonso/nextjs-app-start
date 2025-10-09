"use client"

import { authClient } from "@/libs/auth-client"
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "./ui/dropdown-menu"

export function SidebarDropdownMenuItemSignOut({ children }: { children?: React.ReactNode }) {

    const router = useRouter()

    const signOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/signin"),
            },
        });
    }

    return (
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
            {children}
        </DropdownMenuItem>
    )
}