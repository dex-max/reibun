import sys
import os
from typing import cast, TypedDict

from psycopg2 import connect, sql
from psycopg2.extras import execute_batch, RealDictCursor

class SentenceEntry(TypedDict):
    id: int
    content: str

class SentenceDB:
    def __init__(self):
        user = os.environ.get('SQL_USERNAME')
        password = os.environ.get('SQL_PASSWORD')
        port = os.environ.get('SQL_PORT')
        self.connection = connect(host='db', port=port, user=user, password=password, dbname="reibun")

    def search_sentences(self, search_term: str) -> list[SentenceEntry]:
        with self.connection as connection:
            with connection.cursor(cursor_factory=RealDictCursor) as cursor:
                query = sql.SQL(
                    "SELECT {fields} FROM sentence WHERE to_tsvector('japanese', content) @@ phraseto_tsquery('japanese', %s)"
                ).format(
                    fields=sql.SQL(',').join(map(sql.Identifier, SentenceEntry.__annotations__.keys()))
                )

                cursor.execute(query, (search_term,))

                sentences = cursor.fetchall()
                return [cast(SentenceEntry, sentence) for sentence in sentences]

    def store_sentences(self, sentences: list[SentenceEntry]) -> None:
        with self.connection as connection:
            with connection.cursor() as cursor:
                query = sql.SQL(
                    "INSERT INTO sentence {fields} VALUES {values}"
                ).format(
                    fields=sql.SQL(',').join(map(sql.Identifier, SentenceEntry.__annotations__.keys())),
                    values=sql.SQL(',').join(sql.Placeholder() * len(SentenceEntry.__annotations__))
                )

                execute_batch(cursor, query, sentences)
                
                self.connection.commit()
                cursor.close()