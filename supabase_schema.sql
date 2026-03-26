-- Users Extension (Profiles)
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  subscription_status text DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'canceled')),
  subscription_id text,
  stripe_customer_id text,
  charity_id uuid,
  charity_percentage integer DEFAULT 10 CHECK (charity_percentage >= 10 AND charity_percentage <= 100),
  created_at timestamp with time zone DEFAULT now()
);

-- Charities
CREATE TABLE public.charities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  image_url text,
  stripe_account_id text,
  created_at timestamp with time zone DEFAULT now()
);

-- Golf Scores
CREATE TABLE public.scores (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) NOT NULL,
  score integer NOT NULL CHECK (score >= 1 AND score <= 45),
  date date NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Draws
CREATE TABLE public.draws (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  month date NOT NULL, -- First day of the month
  type text NOT NULL CHECK (type IN ('random', 'algorithm')),
  result_numbers integer[], -- Array of 5 numbers
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'published')),
  created_at timestamp with time zone DEFAULT now()
);

-- Winnings
CREATE TABLE public.winnings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) NOT NULL,
  draw_id uuid REFERENCES public.draws(id) NOT NULL,
  match_type integer NOT NULL CHECK (match_type IN (3, 4, 5)),
  amount numeric(10, 2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'paid')),
  proof_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draws ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.winnings ENABLE ROW LEVEL SECURITY;

-- Policies for Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Policies for Charities
CREATE POLICY "Anyone can view charities" ON public.charities FOR SELECT USING (true);
CREATE POLICY "Admins can manage charities" ON public.charities FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Policies for Scores
CREATE POLICY "Users can view own scores" ON public.scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scores" ON public.scores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own scores" ON public.scores FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own scores" ON public.scores FOR DELETE USING (auth.uid() = user_id);

-- Policies for Draws
CREATE POLICY "Anyone can view published draws" ON public.draws FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage draws" ON public.draws FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Policies for Winnings
CREATE POLICY "Users can view own winnings" ON public.winnings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update proof for own winnings" ON public.winnings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage winnings" ON public.winnings FOR ALL USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
