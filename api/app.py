from flask import Flask, request
from flask_cors import CORS
from db import SentenceDB

app = Flask(__name__)
CORS(app)
sentenceDB = SentenceDB()

@app.route('/sentences')
def get_sentences():
    search_term = request.args.get('search-term')

    if search_term is None:
        no_search_response = {
            'error': { 'code': 400, 'message': 'No search term'}
        }
        return no_search_response, 400

    response = {
        'data': sentenceDB.search_sentences(search_term)
    }

    return response
