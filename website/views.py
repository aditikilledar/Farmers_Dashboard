from flask import Blueprint, render_template, request
cities = ["New York", "London", "Tokyo", "Paris", "Berlin"]
views = Blueprint('views', __name__)
@views.route('/')

def home():
    if request.method == 'POST':
        selected_city = request.form.get('city')
        return f'Selected city: {selected_city}'
    return render_template("base.html", cities=cities)
