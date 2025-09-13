import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/src/lib/auth";

import HomeView from "@/src/modules/home/ui/views/homeView";
import { caller } from "@/src/trpc/server";

export default async function Home() {
  const data = await caller.hello({ text: "Jordi Server" })

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/sign-in");
  }

  return <p>{data.greeting}</p>

  return <HomeView />
}
