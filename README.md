# Reibun 例文 - Example Sentence Search for Japanese Learners
Reibun is a resource for Japanese language learners to find and learn from high quality example sentences

## Features
- **Sentence Search**: Search through over 200,000 sentences by single words or multi-word phrases
- **Sentence Segmentation**: Built-in sentence segmentation with morphological analysis
- **Integrated Dictionary**: Hover over words for dictionary definitions

## Getting Started

### Running with Docker Compose
Requirements: Docker and Docker Compose

1. Edit the `.env.example` as needed and rename to `.env`
2. `docker compose up`
3. Check out the application at <http://localhost:5173>

## Credits
- Example sentence sources: [Tatoeba](https://tatoeba.org)
- PostgreSQL Japanese full text search extension: [textsearch_ja](https://github.com/dex-max/textsearch_ja) forked from [pgFoundry](https://www.postgresql.org/ftp/projects/pgFoundry/textsearch-ja/textsearch_ja/9.0.0/)
- Tokenizer and morphological analysis: [Kuromoji](https://github.com/atilika/kuromoji)
- Dictionary definitions: [JMdict](https://www.edrdg.org/jmdict/j_jmdict.html) and [jmdict-simplified](https://github.com/scriptin/jmdict-simplified)
