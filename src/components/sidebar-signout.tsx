"use client"

import { authClient } from "@/libs/auth-client"
import { useRouter } from "next/navigation"

export function SignOutSidebar({ children }: { children?: React.ReactNode }) {

    const router = useRouter()

    const signOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/signin"),
            },
        });
    }

    return (
        <span onClick={signOut}>
            {children}
        </span>
    )
}