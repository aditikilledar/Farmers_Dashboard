from flask import Blueprint, render_template, request, jsonify
from geopy.geocoders import Nominatim

views = Blueprint('views', __name__)
@views.route('/')

def home():
    
    return render_template("base.html")

@views.route('/geocode', methods=['POST'])
def geocode():
    city_name = request.form['cityName']
    geolocator = Nominatim(user_agent="your_app_name")
    location = geolocator.geocode(city_name)

    if location:
        coordinates = {"lat": location.latitude, "lon": location.longitude}
        return jsonify(coordinates)
    else:
        return jsonify({"error": "City not found"}), 404