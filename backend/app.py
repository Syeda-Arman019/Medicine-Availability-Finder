import os
import mysql.connector
from config import Config
from flask import Flask, jsonify, request
from flask_cors import CORS

from routes.auth_routes import auth_bp
from routes.chatbot_routes import chatbot_bp
from routes.inventory_routes import inventory_bp
from routes.medicine_routes import medicine_bp
from routes.pharmacy_routes import pharmacy_bp
from routes.reservation_routes import reservation_bp
from routes.search_routes import search_bp


app = Flask(__name__)
app.config.from_object(Config)

CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=True
)


# Register Blueprints
app.register_blueprint(pharmacy_bp)
app.register_blueprint(medicine_bp)
app.register_blueprint(inventory_bp)
app.register_blueprint(search_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(reservation_bp)
app.register_blueprint(chatbot_bp)


# Helper function to get database connection
def get_db_connection():
    return mysql.connector.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME
    )


try:
    db = get_db_connection()
    print("✅ MySQL Connected Successfully!")
    db.close()
except Exception as e:
    print("❌ Database Connection Error:", e)


@app.route("/")
def home():
    return {
        "message": "Medicine Availability Finder Backend Running Successfully!"
    }
# ================= ACCOUNT SETTINGS ENDPOINTS ================= #

@app.route("/update-profile", methods=["PUT"])
def update_profile():
    data = request.get_json() or {}

    user_id = data.get("user_id")
    full_name = data.get("full_name")
    email = data.get("email")
    phone = data.get("phone")
    country = data.get("country")
    location = data.get("location")

    if not user_id:
        return jsonify({
            "error": "User ID is required"
        }), 400

    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            UPDATE users
            SET full_name = %s,
                email = %s,
                phone = %s,
                country = %s,
                location = %s
            WHERE user_id = %s
        """

        cursor.execute(
            query,
            (
                full_name,
                email,
                phone,
                country,
                location,
                user_id
            )
        )

        conn.commit()

        return jsonify({
            "message": "Profile updated successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()

        if conn:
            conn.close()


@app.route("/change-password", methods=["PUT"])
def change_password():
    data = request.get_json() or {}

    user_id = data.get("user_id")
    current_password = data.get("current_password")
    new_password = data.get("new_password")

    if not user_id or not current_password or not new_password:
        return jsonify({
            "error": "All fields are required"
        }), 400

    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT password FROM users WHERE user_id = %s",
            (user_id,)
        )

        user = cursor.fetchone()

        if not user:
            return jsonify({
                "error": "User not found"
            }), 404

        if user["password"] != current_password:
            return jsonify({
                "error": "Incorrect current password"
            }), 400

        cursor.execute(
            "UPDATE users SET password = %s WHERE user_id = %s",
            (new_password, user_id)
        )

        conn.commit()

        return jsonify({
            "message": "Password changed successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()

        if conn:
            conn.close()


@app.route("/update-notifications", methods=["PUT"])
def update_notifications():
    data = request.get_json() or {}

    user_id = data.get("user_id")
    email_alerts = data.get("email_alerts")
    security_alerts = data.get("security_alerts")

    if not user_id:
        return jsonify({
            "error": "User ID is required"
        }), 400

    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            UPDATE users
            SET email_alerts = %s,
                security_alerts = %s
            WHERE user_id = %s
        """

        cursor.execute(
            query,
            (
                email_alerts,
                security_alerts,
                user_id
            )
        )

        conn.commit()

        return jsonify({
            "message": "Notification settings saved"
        }), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()

        if conn:
            conn.close()


@app.route("/delete-account", methods=["DELETE"])
def delete_account():
    data = request.get_json() or {}

    user_id = data.get("user_id")
    password = data.get("password")

    if not user_id or not password:
        return jsonify({
            "error": "User ID and Password are required"
        }), 400

    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT password FROM users WHERE user_id = %s",
            (user_id,)
        )

        user = cursor.fetchone()

        if not user:
            return jsonify({
                "error": "User not found"
            }), 404

        if user["password"] != password:
            return jsonify({
                "error": "Incorrect password. Account not deleted."
            }), 400

        try:
            cursor.execute(
                "DELETE FROM reservations WHERE user_id = %s",
                (user_id,)
            )
        except Exception:
            pass

        cursor.execute(
            "DELETE FROM users WHERE user_id = %s",
            (user_id,)
        )

        conn.commit()

        return jsonify({
            "message": "Account deleted permanently"
        }), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()

        if conn:
            conn.close()


if __name__ == "__main__":
    app.run(debug=True)