import type { APIRoute } from "astro"
import { createClient } from "@supabase/supabase-js"

export const GET: APIRoute = async () => {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  )

  const { count, error } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true })

  if (error) {
    return new Response(JSON.stringify({ count: 0 }), { status: 500 })
  }

  return new Response(JSON.stringify({ count }), { status: 200 })
}