'use server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { JwtPayload } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function connection() {
  const cookieStore = cookies();

  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // El método `setAll` fue llamado desde un Server Component.
          // Esto puede ser ignorado si el middleware refresca la sesión.
        }
      },
    },
  });
}

export async function Login(email: string, password: string) {
  const db = await connection();
  let { data, error } = await db.auth.signInWithPassword({
    email,
    password,
  });

  if (error)
    return {
      user: null,
      session: null,
      weakPassword: null,
    };

  return data;
}

export async function updateSession(): Promise<JwtPayload | undefined> {
  const db = await connection();
  const { data } = await db.auth.getClaims();
  const user = data?.claims;
  return user;
}

export async function Logout() {
  const db = await connection();
  let { error } = await db.auth.signOut();
}
