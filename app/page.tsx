import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Body from "./components/body";
import LeftSidebar from "./components/leftSidebar";
import RightSidebar from "./components/rightSidebar";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    redirect("/login");
  }
  return (
    <main className="flex-1 grid grid-cols-4 gap-4">
      <LeftSidebar />
      <Body />
      <RightSidebar />
    </main>
  );
}
