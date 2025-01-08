FROM postgres:17

RUN apt-get update && apt-get install -y wget gcc make sudo postgresql-server-dev-17 libmecab-dev libmecab2 mecab-ipadic-utf8 mecab-utils libmecab-perl libtext-mecab-perl mecab mecab-jumandic-utf8

RUN wget https://ftp.postgresql.org/pub/projects/pgFoundry/textsearch-ja/textsearch_ja/9.0.0/textsearch_ja-9.0.0.tar.gz
RUN tar -zxvf textsearch_ja-9.0.0.tar.gz && rm textsearch_ja-9.0.0.tar.gz

WORKDIR /textsearch_ja-9.0.0
RUN make USE_PGXS=1 PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config
RUN make USE_PGXS=1 PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config install

RUN perl -pi -E "s/LANGUAGE 'C'/LANGUAGE 'c'/" textsearch_ja.sql

COPY *.sql /docker-entrypoint-initdb.d/
RUN cp textsearch_ja.sql /docker-entrypoint-initdb.d/

