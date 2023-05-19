const { createClient } = require('@supabase/supabase-js')

const supabaseProjectUrl = 'https://icgpzahxntmmjolyaaed.supabase.co'
const supabaseProjectAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZ3B6YWh4bnRtbWpvbHlhYWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIyNTE1NDYsImV4cCI6MTk4NzgyNzU0Nn0.pyh2zTXBZmd-Ff_B0pPskFlK4PPdJO1fwoolRkaFw5A'

const supabase = createClient( supabaseProjectUrl, supabaseProjectAnonKey )


module.exports = supabase 
