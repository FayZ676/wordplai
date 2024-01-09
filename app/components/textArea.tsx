"use client";

import React, { useEffect, useRef } from "react";

interface TextAreaProps {
  handleChange: (updatedTaskSubmission: string) => void;
  submission: string;
}

export default function TextArea({ handleChange, submission }: TextAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Focus the input element when the component mounts
    inputRef.current?.focus();
  }, []);

  return (
    <div className="">
      <textarea
        // type="text"
        ref={inputRef}
        placeholder="Start typing"
        value={submission}
        onChange={(e) => {
          handleChange(e.target.value)
        }}
        className="outline-none w-full"
      />
    </div>
  );
}
