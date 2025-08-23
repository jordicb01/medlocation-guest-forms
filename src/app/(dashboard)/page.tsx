import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/src/lib/auth";

import HomeView from "@/src/modules/home/ui/views/homeView";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <HomeView />
  );
}
