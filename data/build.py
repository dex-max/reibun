import os
import psycopg2
import subtitle.parser
import sys

SOURCES_PATH = 'data/'

def insert_sentences(connection, sentences: list[str]) -> None:
    cursor = connection.cursor()

    for sentence in sentences:
        cursor.execute("INSERT INTO sentence (content) VALUES (%s)", (sentence,))

    connection.commit()
    cursor.close()

def build_jimaku(connection) -> None:
    JIMAKU_PATH = os.path.join(SOURCES_PATH, 'jimaku/')

    for jimaku_id in os.listdir(JIMAKU_PATH):
        for sub_name in os.listdir(os.path.join(JIMAKU_PATH, jimaku_id)):
            srt_path = os.path.join(JIMAKU_PATH, jimaku_id, sub_name)
            sentences = subtitle.parser.extract_sentences(srt_path)
            insert_sentences(connection, sentences)
    
    cursor = connection.cursor()
    cursor.execute("CREATE INDEX content_vector_idx ON sentence USING GIN (to_tsvector('japanese', content))")
    connection.commit()

def build_all(user: str, password: str) -> None:
    connection = psycopg2.connect(host='db', port=5432, user=user, password=password, dbname="reibun")
    build_jimaku(connection)
    connection.close()

if __name__ == '__main__':
    user = os.environ.get('SQL_USERNAME')
    password = os.environ.get('SQL_PASSWORD')

    if user is None or password is None:
        print('Set postgres username and password in .env')
    else:
        build_all(user, password)
        print('Data build completed')
