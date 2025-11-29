import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient as createClientJS } from '@supabase/supabase-js'

/**
 * 1. Standard Client (For Server Components & Server Actions)
 * Uses cookies to handle logged-in user sessions.
 * Use this when you need to fetch data FOR a user (e.g., "My Profile").
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

/**
 * 2. Admin Client (For API Routes / Background Jobs)
 * Uses the SERVICE_ROLE_KEY to bypass Row Level Security (RLS).
 * Use this for "System" tasks like uploading files for anonymous users.
 * WARNING: Never use this on the client-side (browser).
 */
export function createAdminClient() {
  return createClientJS(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
