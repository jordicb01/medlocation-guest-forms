import { useRouter } from "next/navigation";

import { authClient } from "@/src/lib/auth-client"

import {
    ChevronUp,
    LogOut,
    Settings,
    WalletCards,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu"
import { SidebarMenuButton } from "@/src/components/ui/sidebar";
import { Avatar, AvatarImage } from "@/src/components/ui/avatar";
import GeneratedAvatar from "@/src/components/generatedAvatar";

const dropdownItems = [
    {
        title: "Account",
        url: "#",
        icon: Settings,
    },
    {
        title: "Billing",
        url: "#",
        icon: WalletCards,
    }
]

const DashboardUserButton = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in")
                }
            }
        })
    }

    if (isPending || !session?.user) {
        return null
    }

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-auto">
                    {/* <User2 /> Username */}
                    {session.user.image ? (
                        <Avatar>
                            <AvatarImage src={session.user.image} />
                        </Avatar>
                    ) : (
                        <GeneratedAvatar seed={session.user.firstName + " " + session.user.lastName} className="size-9 mr-3" />
                    )}
                    <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                        <p className="text-sm truncate w-full">
                            {session.user.firstName + " " + session.user.lastName}
                        </p>
                        <p className="text-xs truncate w-full text-gray-600">
                            {session.user.email}
                        </p>
                    </div>
                    <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="top"
                className="w-40"
                align="end"
            >
                {dropdownItems.map((item) => (
                    <DropdownMenuItem key={item.title} asChild>
                        <a href={item.url} className="flex justify-between cursor-pointer">
                            <span>{item.title}</span>
                            <item.icon />
                        </a>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                    className="flex justify-between cursor-pointer"
                    onClick={onLogout}
                >
                    <span>Sign out</span>
                    <LogOut />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DashboardUserButton