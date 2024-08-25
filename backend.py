from flask import Flask, request, jsonify

app = Flask(__name__)

# Define the POST endpoint
@app.route('/bfhl', methods=['POST'])
def post_bfhl():
    try:
        d = request.form
        
        if not d:
            return jsonify({"is_success": False, "user_id": "", "college_email": "", "college_roll_number": "", "numbers": [], "alphabets": [], "highest_lowercase": []}), 400
        
        user_id = "john_doe_17091999"  # Example user ID
        college_email="john@xyz.com"
        college_roll_number="ABCD123"
        # Process the input data
        user_id = d.get('user_id', user_id)
        college_email = d.get('college_email', college_email)
        college_roll_number = d.get('college_roll_number', college_roll_number)
        data = d.get('data', [])
        numbers = [int(item) for item in data if isinstance(item, int) or (isinstance(item, str) and item.isdigit())]
        alphabets = [char for char in d.get('data', []) if char.isalpha()]

        # Find the highest lowercase alphabet
        lowercase_alphabets = [char for char in alphabets if char.islower()]
        highest_lowercase = sorted(set(lowercase_alphabets))[-1:] if lowercase_alphabets else []

        response = {
            "is_success": True,
            "user_id": user_id,
            "email": college_email,
            "roll_number": college_roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase": highest_lowercase
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 500

# Define the GET endpoint
@app.route('/bfhl', methods=['GET'])
def get_bfhl():
    response = {
        "operation_code": 1
    }
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
