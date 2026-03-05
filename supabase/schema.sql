-- User accounts are handled by Supabase Auth (auth.users)

-- Table for storing generated resumes
CREATE TABLE public.resumes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Untitled Resume',
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Create Policies to secure the table
-- Users can only view their own resumes
CREATE POLICY "Users can view own resumes." ON public.resumes
    FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own resumes
CREATE POLICY "Users can insert own resumes." ON public.resumes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own resumes
CREATE POLICY "Users can update own resumes." ON public.resumes
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can only delete their own resumes
CREATE POLICY "Users can delete own resumes." ON public.resumes
    FOR DELETE USING (auth.uid() = user_id);

-- Set up realtime
alter publication supabase_realtime add table public.resumes;
