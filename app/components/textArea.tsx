"use client";

import React, { useEffect, useRef } from "react";

export default function TextArea() {
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
        className="outline-none w-full"
      />
    </div>
  );
}
