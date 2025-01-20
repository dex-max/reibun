CREATE DATABASE reibun;

\c reibun;

CREATE TABLE sentence (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL
);
