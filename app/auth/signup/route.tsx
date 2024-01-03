"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";

interface SignUpProps {
  email: string;
  password: string;
}

export async function SignUp({ email, password }: SignUpProps) {
  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });
}
