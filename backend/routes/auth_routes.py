from flask import Blueprint, request, jsonify
from database.db import get_db_connection

import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

auth_bp = Blueprint("auth", __name__)


def send_welcome_email(receiver_email, username):
    try:
        EMAIL_USER = os.getenv("EMAIL_USER")
        EMAIL_PASS = os.getenv("EMAIL_PASS")

        if not EMAIL_USER or not EMAIL_PASS:
            print("⚠️ EMAIL_USER or EMAIL_PASS missing in .env file!")
            return

        msg = EmailMessage()
        msg["Subject"] = "Welcome to MediFinder"
        msg["From"] = EMAIL_USER
        msg["To"] = receiver_email

        msg.set_content(f"""
Hello {username},

Your account has been successfully created.

You can now search for medicines, check their availability,
and reserve medicines from nearby pharmacies.

Thank you for joining MediFinder!

Regards,
MediFinder Team
""")

        with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(msg)

        print(f"✅ Welcome email sent to {receiver_email}")

    except Exception as e:
        print("❌ Email Error:", e)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}

    full_name = data.get("full_name")
    email = data.get("email")
    phone = data.get("phone")
    country = data.get("country")
    password = data.get("password")

    if not full_name or not email or not password:
        return jsonify({"error": "Full Name, Email, and Password are required!"}), 400

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # 1. Duplicate email check
        cursor.execute("SELECT user_id FROM users WHERE email = %s", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({"error": "Email is already registered!"}), 400

        # 2. Insert new user into database (Updated with country)
        cursor.execute("""
            INSERT INTO users (full_name, email, phone, country, password)
            VALUES (%s, %s, %s, %s, %s)
        """, (full_name, email, phone, country, password))

        connection.commit()

        # 3. Send Welcome Email
        send_welcome_email(email, full_name)

        return jsonify({
            "message": "User registered successfully!"
        }), 201

    except Exception as e:
        connection.rollback()
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    finally:
        cursor.close()
        connection.close()


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and Password are required!"}), 400

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # Updated SELECT query to return complete user data
        cursor.execute("""
            SELECT user_id, full_name, email, phone, country, location FROM users
            WHERE email = %s AND password = %s
        """, (email, password))

        user = cursor.fetchone()

        if user:
            return jsonify({
                "message": "Login successful!",
                "user": user
            }), 200

        return jsonify({
            "message": "Invalid email or password"
        }), 401

    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    finally:
        cursor.close()
        connection.close()


@auth_bp.route("/change-password", methods=["PUT"])
def change_password():
    data = request.get_json() or {}

    user_id = data.get("user_id")
    current_password = data.get("current_password")
    new_password = data.get("new_password")

    if not user_id or not current_password or not new_password:
        return jsonify({
            "error": "User ID, current password and new password are required!"
        }), 400

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        # 1. Check current password
        cursor.execute("""
            SELECT user_id, password
            FROM users
            WHERE user_id = %s
        """, (user_id,))

        user = cursor.fetchone()

        if not user:
            return jsonify({
                "error": "User not found!"
            }), 404

        if user["password"] != current_password:
            return jsonify({
                "error": "Current password is incorrect!"
            }), 401

        # 2. Prevent same password
        if current_password == new_password:
            return jsonify({
                "error": "New password must be different from current password!"
            }), 400

        # 3. Update password
        cursor.execute("""
            UPDATE users
            SET password = %s
            WHERE user_id = %s
        """, (new_password, user_id))

        connection.commit()

        return jsonify({
            "message": "Password changed successfully!"
        }), 200

    except Exception as e:
        connection.rollback()
        return jsonify({
            "error": f"Database error: {str(e)}"
        }), 500

    finally:
        cursor.close()
        connection.close()


@auth_bp.route("/update-profile", methods=["PUT"])
def update_profile():
    data = request.get_json() or {}

    user_id = data.get("user_id")
    full_name = data.get("full_name")
    email = data.get("email")
    phone = data.get("phone")
    country = data.get("country")
    location = data.get("location")

    if not user_id or not full_name or not email:
        return jsonify({
            "error": "User ID, Full Name and Email are required!"
        }), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("""
            UPDATE users
            SET full_name = %s,
                email = %s,
                phone = %s,
                country = %s,
                location = %s
            WHERE user_id = %s
        """, (
            full_name,
            email,
            phone,
            country,
            location,
            user_id
        ))

        connection.commit()

        return jsonify({
            "message": "Profile updated successfully!"
        }), 200

    except Exception as e:
        connection.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()