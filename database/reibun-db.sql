CREATE DATABASE reibun;

\c reibun;

CREATE EXTENSION textsearch_ja;

CREATE TABLE sentence (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL
);
