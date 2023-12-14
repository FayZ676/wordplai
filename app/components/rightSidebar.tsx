"use client";
import React, { useState } from "react";
import Divider from "./divider";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function RightSidebar() {
  const [displaySidebar, setDisplaySidebar] = useState<Boolean>(false);

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
          <div className="grid gap-1 mt-auto">
            <button className="text-right">Sign out</button>
            <Divider />
          </div>
        </>
      )}
    </div>
  );
}
