import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vojscwkhzydlhaioluoc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvanNjd2toenlkbGhhaW9sdW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNTUxMzUsImV4cCI6MjA3NDYzMTEzNX0.Y_10jnMzOP2XpBikzl4XdHABLNyLUwWungSzFMIRef4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);