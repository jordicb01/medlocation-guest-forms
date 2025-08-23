import React from "react"
import Image from "next/image";

import { Card, CardContent } from "@/src/components/ui/card"

interface Props {
    children: React.ReactNode;
}

const layout = ({ children }: Props) => {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className="flex flex-col gap-6">
                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            {children}
                            {/* <div className="bg-muted relative hidden md:block">
                                <img
                                    src="/medlocation_login.png"
                                    alt="Image"
                                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                />
                            </div> */}
                            <div className="border-l-1 border-l-sidebar-border bg-radial from-sidebar-accent to-gray-400 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                                <img
                                    src="/hublocation.svg"
                                    alt="Image"
                                    className="h-[92px] w-[92px]"
                                />
                                <p className="text-2xl font-semibold">
                                    Hublocation
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default layout