"use client"

import { Button } from "@/src/components/ui/button";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

export default function HomeView() {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    if (!session) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div className="flex flex-col p-4 gap-y-4" >
            <p>Welcome, {session.user.firstName}!</p>
            <Button onClick={() => authClient.signOut({
                fetchOptions: {
                    onSuccess: () => router.push('/sign-in')
                }
            })}>
                Sign Out
            </Button>
        </div>
    )
}