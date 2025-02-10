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
                    """
                    SELECT id, ts_headline('japanese', content, search_term, 'HighlightAll=true') AS content
                    FROM sentence, phraseto_tsquery('japanese', %s) AS search_term
                    WHERE to_tsvector('japanese', content) @@ search_term
                    LIMIT 50
                    """
                )

                cursor.execute(query, (search_term,))

                sentences = cursor.fetchall()
                return [cast(SentenceEntry, sentence) for sentence in sentences]
