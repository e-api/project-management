import { cn } from "@/lib/utils"
import { useAuth } from "@/provider/auth-context"
import type { Workspace } from "@/types"
import { ArrowLeft, ArrowRight, CheckCircle2, LayoutDashboard, ListCheck, LogOut, Settings, Users, Wrench } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { SidebarNav } from "./sidebar-nav"

export const SidebarComponent = ({
    currentWorkspace
}: {
    currentWorkspace: Workspace | null
}) => {
    const { user, logout } = useAuth()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const navItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard
        },
        {
            title: "Workspaces",
            href: "/workspaces",
            icon: Users
        },
        {
            title: "My Tasks",
            href: "/my-tasks",
            icon: ListCheck
        },
        {
            title: "Members",
            href: "/members",
            icon: Users
        },
        {
            title: "Achieved",
            href: "/achieved",
            icon: CheckCircle2
        },
        {
            title: "Settings",
            href: "/settings",
            icon: Settings
        }
    ]

    return (
        <div
            className={cn(
            "flex flex-col h-screen border-r bg-sidebar transition-all duration-300",
            isCollapsed ? "w-16 md:w[80px]" : "w-16 md:w-[240px]"
            )}
        >
            {/* Header */}
            <div className="flex h-14 items-center border-b px-4 mb-4">
            <Link to="/dashboard" className="flex items-center">
                {!isCollapsed ? (
                <div className="flex items-center gap-2">
                    <Wrench className="size-6 text-blue-600" />
                    <span className="font-semibold text-lg hidden md:block">
                    TaskHub
                    </span>
                </div>
                ) : (
                <Wrench className="size-6 text-blue-600" />
                )}
            </Link>
            <Button
                variant={"ghost"}
                size="icon"
                className="ml-auto hidden md:block"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {isCollapsed ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
            </Button>
            </div>

            {/* Main nav section */}
            <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full px-3 py-2">
                <SidebarNav
                items={navItems}
                isCollapsed={isCollapsed}
                className={cn(isCollapsed && "items-center space-y-2")}
                currentWorkspace={currentWorkspace}
                />
            </ScrollArea>
            </div>

            {/* Logout section */}
            <div className="p-4">
            <Button
                variant={"ghost"}
                size={isCollapsed ? "icon" : "default"}
                onClick={logout}
                className="w-full justify-start"
            >
                <LogOut className={cn("size-4", isCollapsed && "mr-2")} />
                {!isCollapsed && <span className="hidden md:inline">Logout</span>}
            </Button>
            </div>
        </div>
    )
}