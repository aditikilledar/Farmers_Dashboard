from website import create_app
from flask import Blueprint, render_template, request, jsonify, json
from geopy.geocoders import Nominatim
from openai import OpenAI
import os
from dotenv import load_dotenv
app = create_app()

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

if __name__ == '__main__':
    app.run(debug=True)

