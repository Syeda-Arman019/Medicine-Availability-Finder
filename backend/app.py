from flask import Flask
from flask_cors import CORS
import mysql.connector
from config import Config
from routes.pharmacy_routes import pharmacy_bp
from routes.medicine_routes import medicine_bp
from routes.inventory_routes import inventory_bp
from routes.search_routes import search_bp

app = Flask(__name__)
app.config.from_object(Config)

# React aur Flask ko connect karne ke liye
CORS(app)
app.register_blueprint(pharmacy_bp)
app.register_blueprint(medicine_bp)
app.register_blueprint(inventory_bp)
app.register_blueprint(search_bp)


# MySQL Connection
try:
    db = mysql.connector.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME
    )
    print("✅ MySQL Connected Successfully!")
except Exception as e:
    print("❌ Database Connection Error:", e)

# Home Route
@app.route("/")
def home():
    return {
        "message": "Medicine Availability Finder Backend Running Successfully!"
    }

if __name__ == "__main__":
    app.run(debug=True)