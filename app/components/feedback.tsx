import React from "react";

interface FeedbackProps {
  feedback: string;
}

export default function Feedback({ feedback }: FeedbackProps) {
  return (
    <div className="grid gap-2">
      <h2 className="italic text-lg font-light">Feedback</h2>
      <p className="border rounded-md p-3">{feedback}</p>
    </div>
  );
}
