-- Create table to track used questions for each user/session
CREATE TABLE public.used_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  user_session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient lookups
CREATE INDEX idx_used_questions_session_category ON public.used_questions(user_session_id, category, difficulty);
CREATE INDEX idx_used_questions_question_id ON public.used_questions(question_id);

-- Enable Row Level Security
ALTER TABLE public.used_questions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to manage their own question history
CREATE POLICY "Users can manage their question history" 
ON public.used_questions 
FOR ALL 
USING (true);