import os
from typing import cast, TypedDict

from psycopg2 import connect, sql
from psycopg2.extras import execute_batch, RealDictCursor

class SentenceEntry(TypedDict):
    content: str

class SentenceDB:
    def __init__(self):
        user = os.environ.get('SQL_USERNAME')
        password = os.environ.get('SQL_PASSWORD')
        port = os.environ.get('SQL_PORT')
        self.connection = connect(host='db', port=port, user=user, password=password, dbname="reibun")

    def search_sentences(self, search_term: str) -> list[SentenceEntry]:
        cursor = self.connection.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("SELECT content FROM sentence WHERE to_tsvector('japanese', content) @@ to_tsquery('japanese', %s)", (search_term,))
        sentences = cursor.fetchall()
        cursor.close()

        return [cast(SentenceEntry, sentence) for sentence in sentences]

    def store_sentences(self, sentences: list[SentenceEntry]) -> None:
        cursor = self.connection.cursor()

        query = sql.SQL(
            "INSERT INTO sentence {fields} VALUES {values}"
        ).format(
            fields=sql.SQL(',').join(map(sql.Identifier, SentenceEntry.__annotations__.keys())),
            values=sql.SQL(',').join(sql.Placeholder() * len(SentenceEntry.__annotations__))
        )

        execute_batch(cursor, query, sentences)
        
        self.connection.commit()
        cursor.close()