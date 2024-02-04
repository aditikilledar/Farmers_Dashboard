from website import create_app
import requests
from flask import Blueprint, render_template, request, jsonify, json, redirect, flash, url_for, sessions, make_response
from geopy.geocoders import Nominatim
from flask_pymongo import PyMongo
from openai import OpenAI
import os
from dotenv import load_dotenv

app = create_app()
app.config['MONGO_URI'] = "mongodb+srv://newuser:newmongouser@cluster0.zxhpmba.mongodb.net/db?retryWrites=true&w=majority"
mongo = PyMongo(app)

API_KEY = '4c1d64bec949b1fedecc27ffe4970435'
BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

@app.route('/ask',methods=['POST'])
def ask():
    # Get the question from the request
    question = request.json.get('question')
    rules = request.json.get('rules')
    print(request)

    load_dotenv()

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a farming expert, skilled in advising new farmers on what crops to plant based on environment conditions. You only answer in vegetable names in one to two words only."},
        {"role": "user", "content": question}
    ]
    )

    print(completion.choices[0].message.content)
    
    # print()
    # response = app.response_class(response=json.dumps(completion.choices[0].message.content),status=200, minetype='application/json')
    return jsonify({"message":completion.choices[0].message.content, 'status':200})

@app.route('/askchat',methods=['POST'])
def askchat():
    # Get the question from the request
    question = request.json.get('question')
    rules = request.json.get('rules')
    print(request)

    load_dotenv()

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a farming expert, skilled at advising and answering questions of users who are new in farming domain. Answer questions only related to farming and refrain from answering any other type of questions. Use simple terms to explain. Don't repond more than 100 words."},
        {"role": "user", "content": question}
    ]
    )

    print(completion.choices[0].message.content)
    
    # print()
    # response = app.response_class(response=json.dumps(completion.choices[0].message.content),status=200, minetype='application/json')
    return jsonify({"message":completion.choices[0].message.content, 'status':200})


# @weather_dashboard.route('/', methods=['GET', 'POST'])
@app.route('/', methods=['GET', 'POST'])
def get_weather():
    if request.method == 'POST':
        city = request.form.get('city')
        if city:
            params = {'q': city, 'appid': API_KEY}
            response = requests.get(BASE_URL, params=params)
            weather_data = response.json()

            username = request.cookies.get('username')
            user = mongo.db.users.find_one({'username': username})
            
            if response.status_code == 200:
                # print(weather_data)
                temperature = weather_data['main']['temp']
                icon = weather_data['weather'][0]['icon']
                description = weather_data['weather'][0]['description']
                print(icon)
                return render_template('dashboard.html', city=city, temperature=temperature, description=description, icon=icon)
            else:
                error_message = f"Error: {weather_data['message']}"
                return render_template('dashboard.html', error_message=error_message, city=city)

    return render_template('dashboard.html', city=None)


@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check if username exists in MongoDB
        user = mongo.db.users.find_one({'username': username})
        if user and password == user['password']:
            # Create a response object
            response = make_response(redirect(url_for('get_weather')))

            # Set a custom cookie with the username
            response.set_cookie('username', username)
            print(f"Cookie set for username: {username}")
            return response
        else:
            return 'Invalid username or password'

    return render_template('login.html')

@app.route('/logout')
def logout():
    response = make_response(redirect(url_for('get_weather')))

    # Delete the 'username' cookie
    response.delete_cookie('username')

    return response

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check if username already exists
        if mongo.db.users.find_one({'username': username}):
            return 'Username already exists. Please choose a different one.'

        # Insert new user into MongoDB
        mongo.db.users.insert_one({'username': username, 'password': password})

        return redirect(url_for('login'))
    return render_template('signup.html')

@app.route('/add_plant', methods=['GET', 'POST'])
def add_plant():
    if request.method == 'POST':

        username = request.cookies.get('username')
        mongo.db.users.update_one({'username': username}, {'$inc': {'crop_planted': 1}}, upsert=True)


        return redirect(url_for('get_weather'))
    return render_template('add_plant.html')

@app.route('/harvest_crops', methods=['GET', 'POST'])
def harvest_crops():
    if request.method == 'POST':

        username = request.cookies.get('username')
        mongo.db.users.update_one({'username': username}, {'$inc': {'crop_harvested': 1}}, upsert=True)


        return redirect(url_for('get_weather'))
    return render_template('add_plant.html')

if __name__ == '__main__':
    app.run(debug=True)