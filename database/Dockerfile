FROM dexmax1/textsearch_ja:17

WORKDIR /

RUN apt-get install -y wget bzip2

RUN wget https://downloads.tatoeba.org/exports/per_language/jpn/jpn_sentences.tsv.bz2
RUN bzip2 -d jpn_sentences.tsv.bz2
RUN cut -f3 jpn_sentences.tsv > sentences.tsv

COPY *.sql /docker-entrypoint-initdb.d/