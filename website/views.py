from flask import Blueprint, render_template, request, jsonify
from geopy.geocoders import Nominatim
import openai

views = Blueprint('views', __name__)
@views.route('/')

def home():
    return render_template("base.html")

@views.route('/ask')
def abc():
    return render_template("cropProfile.html")  

# @views.route('/ask', methods=['POST'])
# def ask():
#     return render_template("cropProfile.html")

# @views.route('/ask1', methods=['POST'])
# def ask1():
#     # Get the question from the request
#     question = request.json.get('question')

#     if not question:
#         return jsonify({'error': 'Question not provided'})

#     try:
#         # Call the OpenAI API to get the response
#         response = openai.Completion.create(
#             engine="davinci",
#             prompt=question,
#             max_tokens=100
#         )
        
#         # Parse the response
#         answer = response.choices[0].text.strip()

#         # Send the response back
#         return jsonify({'answer': answer})

#     except Exception as e:
#         return jsonify({'error': str(e)})