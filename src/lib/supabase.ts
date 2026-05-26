import { createClient } from '@supabase/supabase-js'

// Cast import.meta to 'any' to satisfy the TypeScript compiler
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://ejayydewpkwkewdkhjva.supabase.co'
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqYXl5ZGV3cGt3a2V3ZGtoaHypiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDU0NjYsImV4cCI6MjA2NTQ4MTQ2Nn0.i3Lw3_34Jz73v_5d2m3o_YQ_U5oP8q_J-G3_5k3b2m8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function submitNewsletter(email: string) {
    console.log("Newsletter signup fallback:", email)
    return { success: true, fallback: true }
}