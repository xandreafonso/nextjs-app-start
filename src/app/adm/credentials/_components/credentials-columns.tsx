"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontalIcon } from "lucide-react"

export type CredentialColumns = {
    id: string
    name: string
    description: string | null
    provider: {
        id: string
        name: string
    }
}

export const credentialColumns: ColumnDef<CredentialColumns>[] = [
    {
        id: "id",
        header: "ID",
        cell: ({ row }) => <div title={row.original.id}>{row.original.id.substring(0, 5)}</div>,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "provider.name",
        header: "Provider",
    },
    {
        id: "actions",
        header: "●",
        cell: ({ row }) => <CredentialColumnMenu row={row} />,
    }
]

function CredentialColumnMenu({ row }: { row: any }) {
    return (
        <div className="flex justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Options</DropdownMenuLabel>

                    <DropdownMenuItem>
                        Option 1
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        Option 2
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}