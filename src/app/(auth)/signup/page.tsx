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

const SignupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email(),
    password: z.string().min(4, "Password must be at least 4 characters long"),
})

type SignupType = z.infer<typeof SignupSchema>

export default function SignUpPage() {

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const form = useForm<SignupType>({
        resolver: zodResolver(SignupSchema),
    })

    const handleSubmit = async ({ name, email, password }: SignupType) => {
        setIsLoading(true)

        await authClient.signUp.email({
            name,
            email,
            password,
            callbackURL: "/adm/verified-email",
        }, {
            onSuccess: () => {
                router.push("/adm")
                toast.success(`Redirecting...`)
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
                            <CardTitle>Register</CardTitle>

                            <CardDescription>
                                Enter your name and email below to register for an account
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="name">Name</FieldLabel>

                                        <Input type="text" placeholder="Your name" {...form.register("name")} />

                                        <FieldError errors={[form.formState.errors.name]} />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>

                                        <Input type="email" placeholder="Your email" {...form.register("email")} />

                                        <FieldError errors={[form.formState.errors.email]} />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        
                                        <Input type="password" placeholder="Your password" {...form.register("password")} />

                                        <FieldError errors={[form.formState.errors.password]} />
                                    </Field>

                                    <Field>
                                        <ButtonGo isLoading={isLoading} type="submit">Register</ButtonGo>

                                        <FieldDescription className="text-center">
                                            Do you have an account? <Link href="/signin">Sign in</Link>
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
