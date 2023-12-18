"use client";
import React, { useState } from "react";
import Divider from "./divider";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { signIn, signOut, useSession } from "next-auth/react";

export default function RightSidebar() {
  const [displaySidebar, setDisplaySidebar] = useState<Boolean>(false);
  const { data: session } = useSession();

  function toggleSidebar() {
    setDisplaySidebar(!displaySidebar);
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
          {session ? (
            <div className="grid gap-1 mt-auto">
              <button onClick={() => signOut()} className="text-right">
                Sign Out
              </button>
              <Divider />
            </div>
          ) : (
            <div className="grid gap-1 mt-auto">
              <button onClick={() => signIn()} className="text-right">
                Sign In
              </button>
              <Divider />
            </div>
          )}
          {/* <div className="grid gap-1 mt-auto">
            <button className="text-right">Sign out</button>
            <Divider />
          </div> */}
        </>
      )}
    </div>
  );
}
