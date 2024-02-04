from flask import Blueprint, render_template, request
import requests

views = Blueprint('views', __name__)

# Replace 'YOUR_API_KEY' with the actual OpenWeatherMap API key
@views.route('/')
def index():
    return render_template('dashboard.html')

@views.route('/ask')
def abc():
    return render_template("crop.html")  