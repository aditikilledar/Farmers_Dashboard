from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
  api_key=os.getenv("OPENAI_API_KEY")
)

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a farming expert, skilled in advising new farmers on what crops to plant based on environment conditions. You only answer in vegetable names."},
    {"role": "user", "content": "I am in raleigh, nc,usa, It is sunny and it is winter. Based on the above data, which ONE crop should I plant Output format is CROP_NAME"}
  ]
)

print(completion.choices[0].message.content)