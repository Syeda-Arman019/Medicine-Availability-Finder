from flask import Flask
from flask_cors import CORS
import mysql.connector
from config import Config

from routes.pharmacy_routes import pharmacy_bp
from routes.medicine_routes import medicine_bp
from routes.inventory_routes import inventory_bp
from routes.search_routes import search_bp
from routes.auth_routes import auth_bp
from routes.reservation_routes import reservation_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

app.register_blueprint(pharmacy_bp)
app.register_blueprint(medicine_bp)
app.register_blueprint(inventory_bp)
app.register_blueprint(search_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(reservation_bp)

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

@app.route("/")
def home():
    return {
        "message": "Medicine Availability Finder Backend Running Successfully!"
    }

if __name__ == "__main__":
    app.run(debug=True)

    