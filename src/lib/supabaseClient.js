import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ypytpxpxektrftpeaiyi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlweXRweHB4ZWt0cmZ0cGVhaXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0NTA3MDgsImV4cCI6MjA5ODAyNjcwOH0.rBzEVGzrPXPMvIw_qIyqcPzqb_sIM81IO7ErGHCSzBs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);