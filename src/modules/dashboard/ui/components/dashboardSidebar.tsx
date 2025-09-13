"use client"

import {
    Calendar,
    Home,
    Building,
    Users,
    Inbox,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/src/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import DashboardUserButton from "./dashboardUserButton"

const sidebarItems = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Properties",
        url: "#",
        icon: Building,
    },
    {
        title: "Bookings",
        url: "/bookings",
        icon: Calendar,
    },
    {
        title: "Guests",
        url: "#",
        icon: Users,
    },
    {
        title: "Submissions",
        url: "#",
        icon: Inbox,
    },
]



const DashboardSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <Image src="/hublocation.svg" height={35} width={35} alt="hublocation" />
                    <p className="text-2xl font-semibold">Hublocation</p>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DashboardUserButton />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default DashboardSidebar