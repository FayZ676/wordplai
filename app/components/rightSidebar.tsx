"use client";
import React, { useState } from "react";
import Divider from "./divider";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function RightSidebar() {
  const [displaySidebar, setDisplaySidebar] = useState<Boolean>(false);

  const supabase = createClient();
  const router = useRouter();

  function toggleSidebar() {
    setDisplaySidebar(!displaySidebar);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="col-start-4 text-right flex flex-col gap-4 ml-32">
      <button
        onClick={toggleSidebar}
        className="border rounded-sm p-1.5 ml-auto text-slate-400"
      >
        {displaySidebar ? <IoIosArrowForward /> : <IoIosArrowBack />}
      </button>
      {displaySidebar && (
        <>
          {" "}
          <div className="grid gap-1">
            <button className="text-right">Unlock more features</button>
            <Divider />
          </div>
          <div className="grid gap-1">
            <button className="text-right">Account</button>
            <Divider />
          </div>
          <div className="grid gap-1 mt-auto">
            <button className="text-right" onClick={handleSignOut}>
              Sign out
            </button>
            <Divider />
          </div>
        </>
      )}
    </div>
  );
}
