// utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jpzkldagjsnbhrqkwvtl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwemtsZGFnanNuYmhycWt3dnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NTIxNDksImV4cCI6MjAxNzUyODE0OX0.w7CcaoTxw-YjbvuMcyc5o8u2O7bCLAT_Q7zfZMlX42c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
