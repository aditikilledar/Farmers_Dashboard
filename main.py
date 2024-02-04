from website import create_app
from flask import Blueprint, render_template, request, jsonify, json, redirect, flash, url_for, session
from geopy.geocoders import Nominatim
from flask_pymongo import PyMongo
from openai import OpenAI
import os
from dotenv import load_dotenv

app = create_app()
app.config['MONGO_URI'] = "mongodb+srv://newuser:newmongouser@cluster0.zxhpmba.mongodb.net/db?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route('/ask',methods=['POST'])
def ask():
    # Get the question from the request
    question = request.json.get('question')
    print(request)

    load_dotenv()

    client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
    )

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a farming expert, skilled in advising new farmers on what crops to plant based on environment conditions. You only answer in vegetable names."},
        {"role": "user", "content": question}
    ]
    )

    print(completion.choices[0].message.content)
    
    # print()
    # response = app.response_class(response=json.dumps(completion.choices[0].message.content),status=200, minetype='application/json')
    return jsonify({"message":completion.choices[0].message.content, 'status':200})


@app.route('/login')
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check if username exists in MongoDB
        user = mongo.db.users.find_one({'username': username})

        if user and password=="Qwerty@12345":
            session['username'] = username
            return redirect(url_for('home'))
        else:
            return 'Invalid username or password'
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check if username already exists
        if mongo.db.users.find_one({'username': username}):
            return 'Username already exists. Please choose a different one.'

        hashed_password = "Qwerty@12345"

        # Insert new user into MongoDB
        mongo.db.users.insert_one({'username': username, 'password': hashed_password})

        return redirect(url_for('login'))
    return render_template('signup.html')

if __name__ == '__main__':
    app.run(debug=True)