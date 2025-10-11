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

const ForgotSchema = z.object({
    email: z.email(),
})

type ForgotType = z.infer<typeof ForgotSchema>

export default function ForgotPage() {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ForgotType>({
        resolver: zodResolver(ForgotSchema),
    })

    const handleSubmit = async ({ email }: ForgotType) => {
        setIsLoading(true)

        await authClient.requestPasswordReset({
            email,
            redirectTo: `${window.location.origin}/password`
        }, {
            onSuccess: () => {
                setIsLoading(false)
                toast.success(`Verify your email to reset your password`)
            },

            onError: (context) => {
                setIsLoading(false)
                toast.warning(context.error.message)
            }
        })
    }

    return (
        <div className="min-h-svh w-full p-6 md:p-10 flex items-center justify-center">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6")}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Reset your password</CardTitle>

                            <CardDescription>
                                Enter your email below to reset your password
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>

                                        <Input type="email" placeholder="Your email" {...form.register("email")} />

                                        <FieldError errors={[form.formState.errors.email]} />
                                    </Field>

                                    <Field>
                                        <ButtonGo isLoading={isLoading} type="submit">Reset Password</ButtonGo>

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
