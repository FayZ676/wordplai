import { createClient } from "@/utils/supabase/server";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  async function signIn(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return redirect("/login?message=Could not authenticate user");
    }

    console.log(data);

    return redirect("/");
  }

  async function signUp(formData: FormData) {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${origin}/auth/callback` },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  }

  return (
    <div>
      <form action={signIn}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button>Sign In</button>
        <button formAction={signUp}>Sign Up</button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
