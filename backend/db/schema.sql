\echo 'Deleting and creating novus_db database...'

DROP DATABASE IF EXISTS novus_db;
CREATE DATABASE novus_db;

\c novus_db;

\echo 'Creating extensions...'
CREATE EXTENSION IF NOT EXISTS vector;

\echo 'Creating tables...'

-- Articles table
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    url TEXT UNIQUE NOT NULL,
    source VARCHAR(255),
    category VARCHAR(100),
    embedding vector(1536),
    published_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for similarity search
CREATE INDEX article_embedding_idx 
ON articles USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- User preferences table
CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    preferred_categories TEXT[],
    preferred_sources TEXT[],
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User reading history table
CREATE TABLE user_reading_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    engagement_time INTEGER,
    UNIQUE(user_id, article_id)
);

\echo 'Adding sample data...'

-- Sample articles
INSERT INTO articles (title, content, url, source, category, published_date) VALUES
(
    'Sample Tech Article',
    'This is a sample technology article content.',
    'https://example.com/tech-article',
    'Tech News',
    'technology',
    CURRENT_TIMESTAMP
),
(
    'Sample Business Article',
    'This is a sample business article content.',
    'https://example.com/business-article',
    'Business News',
    'business',
    CURRENT_TIMESTAMP
);

-- Sample user preferences
INSERT INTO user_preferences (user_id, preferred_categories, preferred_sources) VALUES
(1, ARRAY['technology', 'business'], ARRAY['Tech News', 'Business News']);

-- Sample reading history
INSERT INTO user_reading_history (user_id, article_id, engagement_time) VALUES
(1, 1, 300);

\echo 'Database setup completed.' 