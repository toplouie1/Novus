\echo 'Deleting and creating novus_db database...'

SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'novus_db' AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS novus_db;
CREATE DATABASE novus_db;

\c novus_db;

\echo 'Creating extensions...'
CREATE EXTENSION IF NOT EXISTS vector;

\echo 'Creating tables...'

DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS user_preferences;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
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

CREATE INDEX article_embedding_idx 
ON articles USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    preferred_categories TEXT[],
    preferred_sources TEXT[],
    embedding vector(1536)
);

\echo 'Adding sample data...'

INSERT INTO users (username, email, password_hash) VALUES
('john_doe', 'john@example.com', 'hashedpassword123'),
('jane_smith', 'jane@example.com', 'hashedpassword456'),
('alice_jones', 'alice@example.com', 'hashedpassword789');

INSERT INTO articles (source_name, author, title, description, url, url_to_image, published_at, content, embedding) VALUES
('9to5google.com', 'Ben Schoon', 'Android 16 beta hints at return of custom icon shapes, new notification panel, more [Gallery] - 9to5Google',
 'Google released a new Android 16 beta earlier this week and, hiding beneath the scenes, there are more new features...',
 'http://9to5google.com/2025/03/16/android-16-beta-3-notification-panel-icon-shapes-work-in-progress/', 
 'https://i0.wp.com/9to5google.com/wp-content/uploads/sites/4/2024/11/Android-16-Logo-6-4.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1',
 '2025-03-16T17:12:41Z',
 'Google released a new Android 16 beta with additional features including custom icon shapes and a revamped notification panel.',
 NULL),
('techcrunch.com', 'Sarah Perez', 'Apple announces new privacy features for iOS 17',
 'Apple unveiled several new privacy-focused features at their WWDC 2025 keynote, including tools for app tracking transparency.',
 'https://techcrunch.com/2025/03/15/apple-announces-new-privacy-features-for-ios-17/',
 'https://techcrunch.com/wp-content/uploads/2025/03/ios17-privacy.jpg',
 '2025-03-15T14:30:00Z',
 'Apple announced new privacy features at WWDC 2025 to enhance user data security and app tracking transparency.',
 NULL),
('bbc.com', 'Tom Smith', 'New features in Google Search for 2025',
 'Google has introduced new features to its search engine, including enhanced AI-driven search results and smarter voice recognition.',
 'https://bbc.com/2025/03/14/google-search-new-features-2025/',
 'https://bbc.com/wp-content/uploads/2025/03/google-search-2025.jpg',
 '2025-03-14T10:00:00Z',
 'Google Search 2025 introduces AI-driven personalization and improved voice recognition features.',
 NULL);

DELETE FROM user_preferences;
INSERT INTO user_preferences (user_id, preferred_categories, preferred_sources, embedding) VALUES
(1, ARRAY['technology', 'business'], ARRAY['9to5google.com', 'TechCrunch'], NULL),
(2, ARRAY['health', 'entertainment'], ARRAY['BBC', 'Entertainment Weekly'], NULL),
(3, ARRAY['science', 'sports'], ARRAY['Nature', 'ESPN'], NULL);

\echo 'Database setup completed.'
