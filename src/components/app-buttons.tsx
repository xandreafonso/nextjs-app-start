import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRightIcon, FilePenLineIcon, LinkIcon, PlusIcon, SaveIcon, SearchIcon, TrashIcon, XIcon } from "lucide-react";
import React from "react";
import { VariantProps } from "class-variance-authority";
import { Spinner } from "@/components/ui/spinner"

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant']

export type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }

export type AppButtonProps = {
    isLoading?: boolean
} & ButtonProps

export function ButtonSearch({ children, isLoading = false, disabled = false, ... props }: AppButtonProps) {
    return (
        <Button { ... props } disabled={isLoading || disabled}>
            {isLoading ?  <Spinner /> : <SearchIcon />}
            {children}
        </Button>
    )
}

export function ButtonNew({ children, isLoading = false, disabled = false, ... props }: AppButtonProps) {
    return (
        <Button { ... props } disabled={isLoading || disabled}>
            {isLoading ?  <Spinner /> : <PlusIcon />}
            {children}
        </Button>
    )
}

export function ButtonSave({ children, isLoading = false, disabled = false, ... props }: AppButtonProps) {
    return (
        <Button { ... props } disabled={isLoading || disabled}>
            {isLoading ?  <Spinner /> : <SaveIcon />}
            {children}
        </Button>
    )
}

export function ButtonEdit({ children, isLoading = false, disabled = false,... props }: AppButtonProps) {
    return (
        <Button { ... props } disabled={isLoading || disabled}>
            {isLoading ? <Spinner /> : <FilePenLineIcon />}
            {children}
        </Button>
    )
}

export function ButtonCancel({ children, isLoading = false, disabled = false, ... props }: AppButtonProps) {
    return (
        <Button variant="outline" { ... props } disabled={isLoading || disabled}>
            {isLoading ? <Spinner /> : <XIcon />}
            {children}
        </Button>
    )
}

export function ButtonTrash({ children, isLoading = false, disabled = false, ... props }: AppButtonProps) {
    return (
        <Button { ... props } disabled={isLoading || disabled}>
            {isLoading ? <Spinner /> : <TrashIcon />}
            {children}
        </Button>
    )
}

export function ButtonGo({ children, isLoading = false, disabled = false, ... props }: AppButtonProps) {
    return (
        <Button { ... props } disabled={isLoading || disabled}>
            {isLoading ?  <Spinner /> : <ArrowRightIcon />}
            {children}
        </Button>
    )
}