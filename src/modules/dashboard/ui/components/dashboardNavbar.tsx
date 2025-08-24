"use client"

import { useEffect, useState } from "react"

import DashboardCommand from "./dashboardCommand"

import { Button } from "@/src/components/ui/button"
import { useSidebar } from "@/src/components/ui/sidebar"

import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar();
    const [commandOpen, setCommandOpen] = useState(false)

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
            <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
                <Button className="size-9" variant="outline" onClick={toggleSidebar}>
                    {(state === "collapsed" || isMobile)
                        ? <PanelLeftIcon className="size-4" />
                        : <PanelLeftCloseIcon className="size-4" />
                    }
                </Button>
                {isMobile ? (
                    <Link href="/" className="flex item-center gap-2 mx-auto">
                        <Image src="/hublocation.svg" height={35} width={35} alt="hublocation" />
                        <p className="text-2xl font-semibold">Hublocation</p>
                    </Link>
                ) : null}
                <Button
                    className="h-9 w-auto md:w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
                    variant="outline"
                    size="sm"
                    onClick={() => setCommandOpen(!commandOpen)}
                >
                    <SearchIcon />

                    {!isMobile ? (
                        <>
                            Search
                            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                                <span className="text-xs">&#8984;</span>K
                            </kbd>
                        </>
                    ) : null}
                </Button>
            </nav>
        </>
    )
}

export default DashboardNavbar