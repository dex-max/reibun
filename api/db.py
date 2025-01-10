import psycopg2
import os

class SentenceDB:
    def __init__(self):

        user = os.environ.get('SQL_USERNAME')
        password = os.environ.get('SQL_PASSWORD')
        port = os.environ.get('SQL_PORT')
        self.connection = psycopg2.connect(host='db', port=port, user=user, password=password, dbname="reibun")

    def search_sentences(self, search_term: str) -> [str]:
        cursor = self.connection.cursor()
        
        cursor.execute("SELECT content FROM sentence WHERE to_tsvector('japanese', content) @@ to_tsquery('japanese', %s)", (search_term,))
        return cursor.fetchall()

    def store_sentences(self, sentences: [str]) -> None:
        cursor = self.connection.cursor()

        for sentence in sentences:
            cursor.execute("INSERT INTO sentence (content) VALUES (%s)", (sentence,))
