-- Create public table for page content
CREATE TABLE page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text UNIQUE NOT NULL,
  text_content jsonb NOT NULL DEFAULT '{}'::jsonb,
  image_url text,
  updated_at timestamp with time zone DEFAULT now()
);

-- Create table to map auth users to specific custom roles
CREATE TABLE user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  role text NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user'
);

-- Enable RLS
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- RLS: Read policies (Page Content is fully public)
CREATE POLICY "Public profiles are viewable by everyone."
  ON page_content FOR SELECT
  USING ( true );

-- RLS: Write policies (Only Admins can Update Content)
CREATE POLICY "Admins can update page content."
  ON page_content FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert page content."
  ON page_content FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );
