import React from "react";
import Feedback from "./feedback";

export default function Footer() {
  return (
    <div className="grid gap-4">
      <div className="text-right">
        <button className="border rounded-sm px-2 py-1 font-light text-slate-400">
          Complete
        </button>
      </div>
      <Feedback />
    </div>
  );
}
