\echo 'Deleting and creating novus_db database...'
DROP DATABASE IF EXISTS novus_db;
CREATE DATABASE novus_db;

\c novus_db;

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
    embedding vector(768),
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
    embedding vector(768),
    CONSTRAINT unique_user UNIQUE (user_id)
);

\echo 'Database setup completed.'
