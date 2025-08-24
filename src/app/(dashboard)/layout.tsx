import { SidebarProvider } from "@/src/components/ui/sidebar"

import DashboardNavbar from "@/src/modules/dashboard/ui/components/dashboardNavbar"
import DashboardSidebar from "@/src/modules/dashboard/ui/components/dashboardSidebar"

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="flex flex-col h-screen w-screen bg-muted">
                <DashboardNavbar />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout
