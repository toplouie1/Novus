\echo 'Deleting and creating novus_db database...'
 
-- Terminate any active connections to the database
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'novus_db' AND pid <> pg_backend_pid();

-- Drop and recreate the database
DROP DATABASE IF EXISTS novus_db;
CREATE DATABASE novus_db;

\c novus_db;

\echo 'Creating extensions...'
CREATE EXTENSION IF NOT EXISTS vector;

\echo 'Creating tables...'

-- Drop existing tables to avoid conflicts
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS user_preferences;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- Articles table
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    source_id INTEGER,
    source_name VARCHAR(255),
    author VARCHAR(255),
    title TEXT NOT NULL,
    description TEXT,
    url TEXT UNIQUE NOT NULL,
    url_to_image TEXT,
    embedding vector(1536),
    published_at TIMESTAMP WITH TIME ZONE,
    content TEXT
);

-- Create index for similarity search
CREATE INDEX article_embedding_idx 
ON articles USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- User preferences table
CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    preferred_categories TEXT[],
    preferred_sources TEXT[]
);

\echo 'Adding sample data...'

-- Sample users (3 users)
INSERT INTO users (username, email, password_hash) VALUES
('john_doe', 'john@example.com', 'hashedpassword123'),
('jane_smith', 'jane@example.com', 'hashedpassword456'),
('alice_jones', 'alice@example.com', 'hashedpassword789');

-- Sample articles (3 articles)
INSERT INTO articles (source_id, source_name, author, title, description, url, url_to_image, published_at, content) VALUES
(1, '9to5google.com', 'Ben Schoon', 'Android 16 beta hints at return of custom icon shapes, new notification panel, more [Gallery] - 9to5Google', 
 'Google released a new Android 16 beta earlier this week and, hiding beneath the scenes, there are more new features...', 
 'http://9to5google.com/2025/03/16/android-16-beta-3-notification-panel-icon-shapes-work-in-progress/', 
 'https://i0.wp.com/9to5google.com/wp-content/uploads/sites/4/2024/11/Android-16-Logo-6-4.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1',
 '2025-03-16T17:12:41Z',
 'Google released a new Android 16 beta earlier this week and, hiding beneath the scenes, there are more new features and changes in the works including custom icon shapes for the app launcher, a revamped notification panel, and other tweaks.'),
(2, 'techcrunch.com', 'Sarah Perez', 'Apple announces new privacy features for iOS 17', 
 'Apple unveiled several new privacy-focused features at their WWDC 2025 keynote, including new tools for app tracking transparency and data security.',
 'https://techcrunch.com/2025/03/15/apple-announces-new-privacy-features-for-ios-17/',
 'https://techcrunch.com/wp-content/uploads/2025/03/ios17-privacy.jpg',
 '2025-03-15T14:30:00Z',
 'Apple announced several new privacy features at WWDC 2025, including new app tracking transparency options and data security improvements. The new tools aim to give users more control over their privacy and how apps can access their data.'),
(3, 'bbc.com', 'Tom Smith', 'New features in Google Search for 2025', 
 'Google has introduced new features to its search engine, including enhanced AI-driven search results and smarter voice recognition.',
 'https://bbc.com/2025/03/14/google-search-new-features-2025/',
 'https://bbc.com/wp-content/uploads/2025/03/google-search-2025.jpg',
 '2025-03-14T10:00:00Z',
 'Google Search 2025 introduces AI-driven features, like personalized search results, improved voice recognition, and better integration with Google Assistant. These changes are expected to revolutionize how users interact with Google on a daily basis.');

-- Sample user preferences (3 preferences for 3 users)
DELETE FROM user_preferences; -- Clear existing preferences
INSERT INTO user_preferences (user_id, preferred_categories, preferred_sources) VALUES
(1, ARRAY['technology', 'business'], ARRAY['9to5google.com', 'TechCrunch']),
(2, ARRAY['health', 'entertainment'], ARRAY['BBC', 'Entertainment Weekly']),
(3, ARRAY['science', 'sports'], ARRAY['Nature', 'ESPN']);

\echo 'Database setup completed.'