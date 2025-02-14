import os
from typing import cast, TypedDict

from psycopg2 import connect, sql
from psycopg2.extras import RealDictCursor

from language.typing import Sentence
from language.segmenter import Segmenter


class SentenceEntry(TypedDict):
    id: int
    content: str


class SentenceDB:
    def __init__(self):
        user = os.environ.get("SQL_USERNAME")
        password = os.environ.get("SQL_PASSWORD")
        port = os.environ.get("SQL_PORT")
        self.connection = connect(
            host="db", port=port, user=user, password=password, dbname="reibun"
        )
        self.segmenter = Segmenter()

    def search_sentences(self, search_term: str) -> list[SentenceEntry]:
        with self.connection as connection:
            with connection.cursor(cursor_factory=RealDictCursor) as cursor:
                query = sql.SQL(
                    """
                    SELECT id, content
                    FROM sentence
                    WHERE to_tsvector('japanese', content) @@ phraseto_tsquery('japanese', %s) 
                    LIMIT 50
                    """
                )

                cursor.execute(query, (search_term,))

                sentences = cursor.fetchall()

                for sentence in sentences:
                    sentence["segments"] = self.segmenter.segmentize(text=sentence["content"])

                return [cast(Sentence, sentence) for sentence in sentences]
