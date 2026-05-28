import type { APIRoute } from "astro"
import { createClient } from "@supabase/supabase-js"

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json()

  console.log("Email received:", email)
  console.log("Supabase URL:", import.meta.env.PUBLIC_SUPABASE_URL)

  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  )

  const { error } = await supabase
    .from("waitlist")
    .insert({ email })

  console.log("Supabase error:", JSON.stringify(error))

  if (error?.code === "23505") {
    return new Response(JSON.stringify({ error: "Already on the waitlist" }), { status: 409 })
  }

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}