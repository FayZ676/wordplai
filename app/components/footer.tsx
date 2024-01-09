"use client";
import React from "react";
import Feedback from "./feedback";

interface FooterProps {
  handleGetFeedback: () => void;
  isLoading: boolean;
  feedback: string;
}

export default function Footer({
  handleGetFeedback,
  isLoading,
  feedback,
}: FooterProps) {
  return (
    <div className="grid gap-4">
      <div className="text-right">
        {feedback === "" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleGetFeedback();
            }}
            className="border rounded-sm px-2 py-1 font-light text-slate-400"
          >
            Complete
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="border-2 rounded-sm border-emerald-500 px-2 py-1 font-normal text-emerald-500"
          >
            New Task
          </button>
        )}
      </div>
      {isLoading && <p>Reviewing your work and crafting feedback ...</p>}
      {feedback !== "" && <Feedback feedback={feedback} />}
    </div>
  );
}
