"use client"

import { cn } from "@/libs/components-utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { authClient } from "@/libs/auth-client"
import { toast } from "sonner"
import { ButtonGo } from "@/components/app-buttons"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ErrorContext } from "better-auth/react"

const ResetPasswordSchema = z.object({
    newPassword: z.string().min(4, "Password must be at least 4 characters long"),
    confirmPassword: z.string().min(1, "Confirmation is required"),
}).superRefine((val, ctx) => {
    if (val.confirmPassword && val.newPassword !== val.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirmPassword"]
        })
    }
})

type ResetPasswordType = z.infer<typeof ResetPasswordSchema>

export default function ResetPasswordPage() {

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const form = useForm<ResetPasswordType>({
        resolver: zodResolver(ResetPasswordSchema),
    })

    const handleSubmit = async ({ newPassword }: ResetPasswordType) => {
        const token = new URLSearchParams(window.location.search).get("token")

        if (!token) {
            return toast.error("Invalid or missing token")
        }

        setIsLoading(true)

        await authClient.resetPassword({
            newPassword,
            token,
            fetchOptions: {
                onSuccess: () => {
                    router.push("/signin")
                    toast.success(`Your password has been reset successfully.`)
                },

                onError: (context: ErrorContext) => {
                    setIsLoading(false)
                    toast.warning(context.error.message)
                }
            }
        })
    }

    return (
        <div className="min-h-svh w-full p-6 md:p-10 flex items-center justify-center">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6")}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Change your password</CardTitle>

                            <CardDescription>
                                Enter your new password below
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="newPassword">New Password</FieldLabel>

                                        <Input type="password" placeholder="Your new password" {...form.register("newPassword")} />

                                        <FieldError errors={[form.formState.errors.newPassword]} />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>

                                        <Input type="password" placeholder="Confirm your new password" {...form.register("confirmPassword")} />

                                        <FieldError errors={[form.formState.errors.confirmPassword]} />
                                    </Field>

                                    <Field>
                                        <ButtonGo isLoading={isLoading} type="submit">Change Password</ButtonGo>

                                        <FieldDescription className="text-center">
                                            Do you remember your password? <Link href="/signin">Sign in</Link>
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
