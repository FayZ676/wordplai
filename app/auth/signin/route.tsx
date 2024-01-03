"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface SignInProps {
  email: string;
  password: string;
}

export async function SignIn({ email, password }: SignInProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}
