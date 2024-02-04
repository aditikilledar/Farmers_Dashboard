from flask import Blueprint, render_template, request
import requests

weather_dashboard = Blueprint('weather_dashboard', __name__)

# Replace 'YOUR_API_KEY' with the actual OpenWeatherMap API key
API_KEY = '4c1d64bec949b1fedecc27ffe4970435'
BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

# def index():
#     return render_template('index.html')

@weather_dashboard.route('/', methods=['GET', 'POST'])
def get_weather():
    if request.method == 'POST':
        city = request.form.get('city')
        if city:
            params = {'q': city, 'appid': API_KEY}
            response = requests.get(BASE_URL, params=params)
            weather_data = response.json()

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
