from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI  # Import the OpenAI client

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
        raise Exception("API Key file not found. Please ensure 'OPENAI_API_KEY.txt' is in the correct location.")

# Set OpenAI API key
OpenAI.api_key = get_OPENAI_API_KEY()

tasks_storage = []  # Store tasks in memory for now

def submit_task():
    try:
        data = request.json
        print("Incoming Task Data:", data)  # Log incoming data

        # Validate task data
        if not all(key in data for key in ['title', 'description', 'priority']):
            return jsonify({"error": "Task details are missing"}), 400

        # Store the task in the in-memory storage
        tasks_storage.append({
            "taskname": data['title'],
            "taskdescription": data['description'],
            "priority": data['priority'],
            "difficulty": data.get('difficulty', 'medium')  # Default to 'medium' if not provided
        })

        return jsonify({"message": "Task successfully submitted", "tasks": tasks_storage}), 200
    except Exception as e:
        print("Unexpected Error:", str(e))  # Log unexpected errors
        return jsonify({"error": str(e)}), 500
    

# Endpoint to generate schedule
@app.route('/generate-schedule', methods=['POST'])
def generate_schedule():
    try:
        data = request.json
        print("Incoming Data:", data)  # Log incoming data
        
        # Validate user preferences
        user_preferences = {
            "hobby": data.get("hobby"),
            "workingStyle": data.get("workingStyle"),
            "breakPreference": data.get("breakPreference"),
            "dayStart": data.get("dayStart"),
            "dayEnd": data.get("dayEnd")
        }

        if not all(user_preferences.values()):
            return jsonify({"error": "Some user preferences are missing"}), 400

        # Use tasks from the in-memory storage
        if not tasks_storage:
            return jsonify({"error": "No tasks submitted"}), 400

        # Create the prompt and call OpenAI API
        prompt = create_prompt(user_preferences, tasks_storage)
        
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
            schedule = completion.choices[0].message['content']
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
    I need to create a daily schedule for a user with the following characteristics and preferences:
    Hobby: {user_preferences['hobby']}
    Working Style: {user_preferences['workingStyle']}
    Break Preference: {user_preferences['breakPreference']}
    Day Start: {user_preferences['dayStart']}
    Day End: {user_preferences['dayEnd']}

    The user has the following tasks for today:
    {task_list}

    Based on these, generate an efficient schedule for the day.
    """
    
    return prompt

if __name__ == '__main__':
    app.run(debug=True)