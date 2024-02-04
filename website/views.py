from flask import Blueprint, render_template, request, jsonify, json
from geopy.geocoders import Nominatim
from openai import OpenAI
import os
from dotenv import load_dotenv

views = Blueprint('views', __name__)
@views.route('/')

def home():
    return render_template("base.html")

@views.route('/ask')
def abc():
    return render_template("crop.html")  