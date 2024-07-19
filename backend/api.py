from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from urllib.parse import quote_plus
# from flask_cors import CORS

# load config from .env file
load_dotenv()
db_username = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
db_cluster = os.getenv('DB_CLUSTER')
db_name = os.getenv('DB_NAME')

MONGO_URI = f"mongodb+srv://{quote_plus(db_username)}:{quote_plus(db_password)}@{db_cluster}.mongodb.net/?retryWrites=true&w=majority&appName={db_name}"

#connect to db
client = MongoClient(MONGO_URI)
db = client[db_name]

#db.create_collection("users", capped=False)

api = Blueprint('api', __name__)
# CORS(api)

@api.route('/', methods=['GET'])
def get_all_users():
    data = list(db.users.find({}))
    for user in data:
        user['_id'] = str(user['_id'])
    return jsonify(data), 200

@api.route('/signup', methods=['POST'])
def signup_user():
    data = request.get_json()

    first_name = data.get('firstname')
    last_name = data.get('lastname')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([first_name, last_name, username, email, password]):
        return jsonify({"msg":"Missing fields"}), 400
    
    if db.users.find_one({'$or' : [{'username':username}, {'email':email}]}):
        return jsonify({"msg":"User already exists"}), 400

    user = {
        'firstName' : first_name,
        'lastName':last_name,
        'username': username,
        'email':email,
        'password':password
    }

    try:
        db.users.insert_one(user)
        return jsonify({'message':'User added successfully'}), 200
    except Exception as e:
        return jsonify({"error":str(e)}), 500

