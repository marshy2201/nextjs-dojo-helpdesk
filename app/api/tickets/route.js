import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function POST(response) {
  const ticket = await response.json();

  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies });

  // get the current user session
  const { data: { session } } = await supabase.auth.getSession();

  // insert the data
  const { data, error } = await supabase.from('tickets')
    .insert({
      ...ticket,
      user_email: session.user.email
    })
    .select()
    .single();

  return NextResponse.json({ data, error });
}