"use client";
import React from "react";
import Feedback from "./feedback";
import { createClient } from "@/utils/supabase/client";

interface FooterProps {
  handleCompleteTask: () => void;
}

export default function Footer({ handleCompleteTask }: FooterProps) {
  return (
    <div className="grid gap-4">
      <div className="text-right">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleCompleteTask();
          }}
          className="border rounded-sm px-2 py-1 font-light text-slate-400"
        >
          Complete
        </button>
      </div>
      {/* <Feedback /> */}
    </div>
  );
}
