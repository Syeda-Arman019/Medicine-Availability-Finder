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
        msg["Subject"] = "Welcome to MedFinder"
        msg["From"] = EMAIL_USER
        msg["To"] = receiver_email

        msg.set_content(f"""
Hello {username},

Your MediFinder account has been created successfully.

You can now search medicines and reserve them online.

Regards,
MedFinder Team
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

        # 2. Insert new user into database
        cursor.execute("""
            INSERT INTO users (full_name, email, phone, password)
            VALUES (%s, %s, %s, %s)
        """, (full_name, email, phone, password))

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
        # Direct email & password verification
        cursor.execute("""
            SELECT user_id, full_name, email FROM users
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