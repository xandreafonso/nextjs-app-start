import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, CommandIcon, HomeIcon, InboxIcon, LinkIcon, MoreHorizontalIcon, NotebookIcon, PlusIcon, SettingsIcon, User2Icon } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { SidebarDropdownMenuItemSignOut } from "./sidebar-signout"
import { auth } from "@/backend/libs/auth"
import { headers } from "next/headers"


export async function AppSidebar() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <CommandIcon className="size-4" />
                                    </div>

                                    <div className="grid flex-1 text-left leading-tight">
                                        <span className="truncate font-medium">Acme Inc</span>
                                        <span className="truncate text-xs">Enterprise</span>
                                    </div>

                                    <ChevronDownIcon className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className="w-60 rounded-lg"
                                align="start"
                                side="bottom"
                                sideOffset={4}
                            >
                                <DropdownMenuItem>
                                    <div className="flex size-6 items-center justify-center rounded-md border">
                                        <SettingsIcon className="size-3.5 shrink-0" />
                                    </div>

                                    <span>Acme Inc</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <div className="flex size-6 items-center justify-center rounded-md border">
                                        <SettingsIcon className="size-3.5 shrink-0" />
                                    </div>

                                    <span>Acme Corp</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="gap-2 p-2">
                                    <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                        <PlusIcon className="size-4" />
                                    </div>

                                    <div className="text-muted-foreground font-medium">Add</div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>

                    <SidebarGroupAction title="Add">
                        <PlusIcon /> <span className="sr-only">Add</span>
                    </SidebarGroupAction>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/adm">
                                        <HomeIcon />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/adm/credentials">
                                        <SettingsIcon />
                                        <span>Credentials</span>
                                    </Link>
                                </SidebarMenuButton>

                                <SidebarMenuAction>
                                    <PlusIcon />
                                    <span className="sr-only">Add</span>
                                </SidebarMenuAction>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/adm">
                                        <User2Icon />
                                        <span>Other</span>
                                    </Link>
                                </SidebarMenuButton>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction>
                                            <MoreHorizontalIcon />
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent side="right" align="start">
                                        <DropdownMenuItem>
                                            <span>Edit</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span>Delete</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/adm">
                                        <SettingsIcon />
                                        <span>Settings</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip="Other">
                                            <NotebookIcon />
                                            <span>Other</span>
                                            <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href="/adm">
                                                        <InboxIcon />
                                                        <span>Sub item</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>

                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip="Other">
                                            <NotebookIcon />
                                            <span>Other</span>
                                            <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href="/adm">
                                                        <InboxIcon />
                                                        <span>Sub item</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <User2Icon className="size-4" />
                                    </div>

                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{session?.user.name}</span>
                                        <span className="truncate text-xs">{session?.user.email}</span>
                                    </div>

                                    <ChevronUpIcon className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className="w-60 rounded-lg"
                                align="start"
                                side="top"
                                sideOffset={4}
                            >
                                <DropdownMenuItem>
                                    <div className="flex size-6 items-center justify-center rounded-md border">
                                        <SettingsIcon className="size-3.5 shrink-0" />
                                    </div>

                                    <span>Account</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <div className="flex size-6 items-center justify-center rounded-md border">
                                        <SettingsIcon className="size-3.5 shrink-0" />
                                    </div>

                                    <span>Billing</span>
                                </DropdownMenuItem>

                                <SidebarDropdownMenuItemSignOut>
                                    <div className="flex size-6 items-center justify-center rounded-md border">
                                        <SettingsIcon className="size-3.5 shrink-0" />
                                    </div>

                                    <span>
                                        Sign out
                                    </span>
                                </SidebarDropdownMenuItemSignOut>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}