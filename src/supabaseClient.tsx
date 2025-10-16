import { useAuth } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bdbxapkdyodqkqnwvafl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkYnhhcGtkeW9kcWtxbnd2YWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMjkxNjMsImV4cCI6MjA3NDcwNTE2M30.vNOMjMxUABDoBPtQWcTJmEVO5MPMzCAPx8za9gkfPEk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useSupabaseAuth = () => {
  const { getToken } = useAuth();

  const getSupabaseClient = async () => {
    try {
      // First try the named template commonly used for Supabase JWTs
      const token = await getToken({ template: "supabase" });
      return createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: `Bearer ${token}` } },
      });
    } catch (err) {
      // If the Clerk project doesn't have that JWT template configured
      // fall back to trying a default token and finally to an unauthenticated client.
      try {
        const fallbackToken = await getToken();
        if (fallbackToken) {
          return createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: `Bearer ${fallbackToken}` } },
          });
        }
      } catch (err2) {
        // ignore and continue to return anon client
      }

      // As a last resort return the anonymous client (no Authorization header).
      return createClient(supabaseUrl, supabaseAnonKey);
    }
  };

  return { getSupabaseClient };
};

// WulfgreWMLE49mHe
