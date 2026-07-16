from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# React aur Flask ko connect karne ke liye
CORS(app)

# Home Route
@app.route("/")
def home():
    return {
        "message": "Medicine Availability Finder Backend Running Successfully!"
    }

if __name__ == "__main__":
    app.run(debug=True)