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

const SigninSchema = z.object({
    email: z.email(),
    password: z.string().min(4, "Password must be at least 4 characters long"),
})

type SigninType = z.infer<typeof SigninSchema>

export default function SignInPage() {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SigninType>({
        resolver: zodResolver(SigninSchema),
    })

    const handleSubmit = async ({ email, password }: SigninType) => {
        setIsLoading(true)

        const { data: result, error } = await authClient.signIn.email({
            email,
            password,
            rememberMe: true,
            callbackURL: "/adm",
        }, {})

        if (result) {
            toast.success(`Redirecting...`)
        } else if (error) {
            setIsLoading(false)
            toast.warning(error.message)
        }
    }

    return (
        <div className="min-h-svh w-full p-6 md:p-10 flex items-center justify-center">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6")}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>

                            <CardDescription>
                                Enter your email below to login to your account
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
                                        <div className="flex items-center">
                                            <FieldLabel htmlFor="password">Password</FieldLabel>

                                            <Link href="/forgot" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                                Forgot your password?
                                            </Link>
                                        </div>

                                        <Input type="password" placeholder="Your password" {...form.register("password")} />

                                        <FieldError errors={[form.formState.errors.password]} />
                                    </Field>

                                    <Field>
                                        <ButtonGo isLoading={isLoading} type="submit">Login</ButtonGo>

                                        <FieldDescription className="text-center">
                                            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
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
