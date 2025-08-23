import { SidebarProvider } from "@/src/components/ui/sidebar"
import DashboardSidebar from "@/src/modules/dashboard/ui/components/dashboardSidebar"

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main>
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout
