import { useAuth } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bdbxapkdyodqkqnwvafl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkYnhhcGtkeW9kcWtxbnd2YWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMjkxNjMsImV4cCI6MjA3NDcwNTE2M30.vNOMjMxUABDoBPtQWcTJmEVO5MPMzCAPx8za9gkfPEk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useSupabaseAuth = () => {
  const { getToken } = useAuth();

  const getSupabaseClient = async () => {
    const token = await getToken({ template: "supabase" });

    return createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
  };

  return { getSupabaseClient };
};

// WulfgreWMLE49mHe
