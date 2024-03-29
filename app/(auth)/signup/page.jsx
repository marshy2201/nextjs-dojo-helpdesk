"use client"

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// components
import AuthForm from "../AuthForm";

export default function Signup() {
  const router = useRouter();
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
  
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`
      }
    });
  
    if (error) {
      setFormError(error.message);
    }
  
    if (!error) {
      router.push('/verify');
    }
  }

  return (
    <main>
      <h2 className="text-center">Sign Up</h2>

      <AuthForm handleSubmit={handleSubmit} />
      {formError && (
        <div className="error">{formError}</div>
      )}
    </main>
  )
}
