"use client";
import React, { useState } from "react";
import Divider from "./divider";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function LeftSidebar() {
  const [displaySidebar, setDisplaySidebar] = useState<Boolean>(false);

  function toggleSidebar() {
    setDisplaySidebar(!displaySidebar);
  }

  return (
    <div className="flex flex-col gap-4 mr-32">
      <button
        onClick={toggleSidebar}
        className="border rounded-sm p-1.5 mr-auto text-slate-400"
      >
        {displaySidebar ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </button>
      {displaySidebar && (
        <>
          {" "}
          <div className="grid gap-1">
            <label htmlFor="select-dropdown" className="font-semibold">
              Genre
            </label>
            <select name="" id="select-dropdown" className="border p-1.5">
              <option value="fantasy">Fantasy</option>
              <option value="sci-fi">Sci-Fi</option>
            </select>
          </div>
          <div className="grid gap-1">
            <label htmlFor="select-dropdown" className="font-semibold">
              Interest
            </label>
            <select name="" id="select-dropdown" className="border p-1.5">
              <option value="fantasy">Dialogue</option>
              <option value="sci-fi">Imagery</option>
            </select>
          </div>
          <Divider />
        </>
      )}
    </div>
  );
}
