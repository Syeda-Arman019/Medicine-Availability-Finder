from flask import Blueprint, request, jsonify
from database.db import get_db_connection

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    full_name = data["full_name"]
    email = data["email"]
    phone = data["phone"]
    password = data["password"]

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO users
        (full_name, email, phone, password)
        VALUES (%s, %s, %s, %s)
    """, (full_name, email, phone, password))

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "User registered successfully!"
    })


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data["email"]
    password = data["password"]

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT * FROM users
        WHERE email = %s AND password = %s
    """, (email, password))

    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if user:
        return jsonify({
            "message": "Login successful!",
            "user": {
                "user_id": user["user_id"],
                "full_name": user["full_name"],
                "email": user["email"]
            }
        })

    return jsonify({
        "message": "Invalid email or password"
    }), 401