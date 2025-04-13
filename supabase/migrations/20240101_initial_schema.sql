-- Create users table that extends the auth.users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create integrations table to store user integrations
CREATE TABLE IF NOT EXISTS public.integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users NOT NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB,
  status TEXT DEFAULT 'connected',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create debugging_sessions table to track debugging sessions
CREATE TABLE IF NOT EXISTS public.debugging_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'in_progress',
  start_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  mttr NUMERIC, -- Mean Time to Resolution in hours
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create log_analyses table to store log analysis results
CREATE TABLE IF NOT EXISTS public.log_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users NOT NULL,
  debugging_session_id UUID REFERENCES public.debugging_sessions,
  log_text TEXT NOT NULL,
  analysis_result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create ai_conversations table to store chat history
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users NOT NULL,
  debugging_session_id UUID REFERENCES public.debugging_sessions,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.debugging_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.log_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can only see and modify their own data
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
CREATE POLICY "Users can view their own data"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
CREATE POLICY "Users can update their own data"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Integrations policies
DROP POLICY IF EXISTS "Users can view their own integrations" ON public.integrations;
CREATE POLICY "Users can view their own integrations"
  ON public.integrations FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own integrations" ON public.integrations;
CREATE POLICY "Users can insert their own integrations"
  ON public.integrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own integrations" ON public.integrations;
CREATE POLICY "Users can update their own integrations"
  ON public.integrations FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own integrations" ON public.integrations;
CREATE POLICY "Users can delete their own integrations"
  ON public.integrations FOR DELETE
  USING (auth.uid() = user_id);

-- Debugging sessions policies
DROP POLICY IF EXISTS "Users can view their own debugging sessions" ON public.debugging_sessions;
CREATE POLICY "Users can view their own debugging sessions"
  ON public.debugging_sessions FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own debugging sessions" ON public.debugging_sessions;
CREATE POLICY "Users can insert their own debugging sessions"
  ON public.debugging_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own debugging sessions" ON public.debugging_sessions;
CREATE POLICY "Users can update their own debugging sessions"
  ON public.debugging_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Log analyses policies
DROP POLICY IF EXISTS "Users can view their own log analyses" ON public.log_analyses;
CREATE POLICY "Users can view their own log analyses"
  ON public.log_analyses FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own log analyses" ON public.log_analyses;
CREATE POLICY "Users can insert their own log analyses"
  ON public.log_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- AI conversations policies
DROP POLICY IF EXISTS "Users can view their own AI conversations" ON public.ai_conversations;
CREATE POLICY "Users can view their own AI conversations"
  ON public.ai_conversations FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own AI conversations" ON public.ai_conversations;
CREATE POLICY "Users can insert their own AI conversations"
  ON public.ai_conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own AI conversations" ON public.ai_conversations;
CREATE POLICY "Users can update their own AI conversations"
  ON public.ai_conversations FOR UPDATE
  USING (auth.uid() = user_id);

-- Enable realtime for all tables
alter publication supabase_realtime add table public.users;
alter publication supabase_realtime add table public.integrations;
alter publication supabase_realtime add table public.debugging_sessions;
alter publication supabase_realtime add table public.log_analyses;
alter publication supabase_realtime add table public.ai_conversations;
