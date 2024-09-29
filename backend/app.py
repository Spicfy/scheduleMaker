from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI  # Import the OpenAI client
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

# Initialize OpenAI client
client = OpenAI()

# Initialize OpenAI with your API key
def get_OPENAI_API_KEY():
    try:
        with open("OPENAI_API_KEY.txt", "r") as key_file:
            key = key_file.read().strip()
            return key
    except FileNotFoundError:
        raise Exception("API Key file not found.")

# Set OpenAI API key
client.api_key = get_OPENAI_API_KEY()
    
# firebase_key_path = "FIREBASE_KEY.json" 

# cred = credentials.Certificate(firebase_key_path)
# firebase_admin.initialize_app(cred, {
#     'databaseURL': 'https://schedulemaker-bb299.firebaseapp.com'
# })

# Reference the database
# ref = db.reference('/users/1')

# Fetch data
# user_data = ref.get()
# print("User Data:", user_data)  # Log user data

tasks_storage = []  # Store tasks in memory for now
    
@app.route('/home', methods=['POST'])
def generate_schedule():
    try:
        print("Request received")  # Log when the request is received
        task_data = request.json.get('task', {})
        print("Incoming Data:", task_data)  # Log incoming data

        # Check if task_data is empty
        if not task_data:
            print("No task data received")
            return jsonify({"error": "No task data received"}), 400
        
        if not all(key in task_data for key in ['title', 'description', 'priority']):
            return jsonify({"error": "Task details are missing"}), 400
        
        tasks_storage.append({
            "taskname": task_data['title'],
            "taskdescription": task_data['description'],
            "priority": task_data['priority'],
            "difficulty": task_data.get('difficulty', 'medium')  # Default to 'medium' if not provided
        })
            
        print("Tasks Storage:", tasks_storage)  # Log tasks storage
        # # Validate user preferences
        # user_preferences = {
        #     "email": user_data['email'],
        # }

        # Use tasks from the in-memory storage
        if not tasks_storage:
            return jsonify({"error": "No tasks submitted"}), 400

        # Create the prompt and call OpenAI API
        prompt = create_prompt("chillguy@mail.com", tasks_storage)
        
        try:
            completion = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are an expert task scheduler."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500
            )
            print("OpenAI Response:", completion)  # Log the response for debugging
            schedule = completion.choices[0].message.content

            print(schedule)
            return jsonify({"schedule": schedule}), 200
        except Exception as e:
            print("OpenAI API Error:", str(e))  # Log OpenAI API errors
            return jsonify({"error": "OpenAI API call failed: " + str(e)}), 500

    except Exception as e:
        print("Unexpected Error:", str(e))  # Log unexpected errors
        return jsonify({"error": str(e)}), 500

# Helper function to create the prompt for GPT-3.5
def create_prompt(user_preferences, tasks):
    task_list = "\n".join([f"Task {i+1}: {task['taskname']}, {task['taskdescription']}, Priority: {task['priority']}, Difficulty: {task['difficulty']}"
                           for i, task in enumerate(tasks)])
    
    prompt = f"""
    I need help scheduling my day. I am an expert task scheduler and I need to plan my day efficiently.
    Based on my email, {user_preferences}, try to analyze and predict my personality and preferences.

    The user has the following tasks for today:
    {task_list}

    Based on these, generate an efficient schedule for the day.
    """
    
    return prompt

if __name__ == '__main__':
    app.run(debug=True)