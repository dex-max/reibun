CREATE DATABASE reibun;

\c reibun;

CREATE EXTENSION textsearch_ja;

CREATE TABLE sentence (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL
);

COPY sentence (content)
FROM '/sentences.tsv';

CREATE INDEX content_vector_idx
ON sentence USING GIN (to_tsvector('japanese', content));