from flask import Flask, request, jsonify
from pymongo import MongoClient
from db_data import init_db


app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017')
db = init_db(client=client)


@app.route('/')
def index():
    return jsonify(client.list_database_names())

@app.route('/temps')
def database():
    weather = db.find_one()
    data = weather['data']
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
    db.drop()
