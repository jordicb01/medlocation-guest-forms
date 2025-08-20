import { headers } from "next/headers"
import { redirect } from "next/navigation";

import { auth } from "@/src/lib/auth"

import AuthForm from "@/src/modules/auth/ui/views/authFormView"

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!!session) {
        redirect("/");
    }

    return (
        <AuthForm type="signIn" />
    );
}

export default Page