"use client";

import React, { useState } from "react";
import { SignIn } from "../auth/signin/route";
import { SignUp } from "../auth/signup/route";
import { useRouter } from "next/navigation";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const router = useRouter();

  const [loading, isLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn(email: string, password: string) {
    const { data, error } = await SignIn({ email, password });
    if (error) {
      setErrorMessage(error.message);
    } else {
      return router.push("/");
    }
  }

  async function handleSignUp(email: string, password: string) {
    const { data, error } = await SignUp({ email, password });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
      setCheckEmail(true);
    }
  }

  function handleUpdateEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleUpdatePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <div className="flex items-center justify-center">
      <form className="flex flex-col gap-4 max-w-md w-full">
        <div className="grid gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleUpdateEmail}
            placeholder="you@example.com"
            required
            className="border rounded-md px-2 py-1 max-w-full"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleUpdatePassword}
            placeholder="••••••••"
            required
            className="border rounded-md px-2 py-1 max-w-full"
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSignIn(email, password);
            }}
            className="flex-1 border rounded-md px-2 py-1"
          >
            Sign In
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSignUp(email, password);
            }}
            className="flex-1 border rounded-md px-2 py-1"
          >
            Sign Up
          </button>
        </div>
        {errorMessage.length > 0 && (
          <p className="border rounded-md border-rose-500 py-4 text-center text-rose-600">
            {errorMessage}
          </p>
        )}
        {checkEmail && (
          <p className="border rounded-md border-emerald-500 py-4 text-center text-emerald-600">
            An email has been sent to your account. Please click the link to
            verify your email address.
          </p>
        )}
      </form>
    </div>
  );
}
