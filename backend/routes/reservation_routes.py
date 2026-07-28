from flask import Blueprint, request, jsonify
from database.db import get_db_connection
from datetime import datetime, timedelta

reservation_bp = Blueprint("reservation", __name__)

@reservation_bp.route("/reserve", methods=["POST"])
def reserve():
    data = request.get_json()

    # 1. Input Validation
    if not data:
        return jsonify({"error": "No data received"}), 400

    required_fields = ["user_id", "pharmacy_id", "cart_items", "total_amount"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    user_id = data["user_id"]
    pharmacy_id = data["pharmacy_id"]
    cart_items = data["cart_items"]
    total_amount = data["total_amount"]

    connection = None
    cursor = None

    # 2. Transaction Management with Rollback Handling
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        reservation_time = datetime.now()
        expiry_time = reservation_time + timedelta(hours=4)

        cursor.execute("""
            INSERT INTO reservations
            (user_id, pharmacy_id, reservation_time,
             expiry_time, total_amount, status)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            user_id,
            pharmacy_id,
            reservation_time,
            expiry_time,
            total_amount,
            "Pending"
        ))

        reservation_id = cursor.lastrowid

        for item in cart_items:
            cursor.execute("""
                INSERT INTO reservation_items
                (reservation_id, medicine_id, quantity, price)
                VALUES (%s, %s, %s, %s)
            """, (
                reservation_id,
                item["medicine_id"],
                item["quantity"],
                item["price"]
            ))

        connection.commit()

        return jsonify({
            "message": "Reservation created successfully",
            "reservation_id": reservation_id
        }), 201

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": f"Failed to create reservation: {str(e)}"}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


@reservation_bp.route("/my-reservations/<int:user_id>", methods=["GET"])
def get_my_reservations(user_id):
    connection = None
    cursor = None
    try:
        
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
SELECT
    r.reservation_id,
    r.status,
    r.total_amount,
    r.reservation_time,
    GROUP_CONCAT(m.medicine_name SEPARATOR ', ') AS medicine_names,
    p.pharmacy_name AS pharmacy_name
FROM reservations r
JOIN reservation_items ri
    ON r.reservation_id = ri.reservation_id
JOIN medicines m
    ON ri.medicine_id = m.medicine_id
JOIN pharmacies p
    ON r.pharmacy_id = p.pharmacy_id
WHERE r.user_id = %s
GROUP BY
    r.reservation_id,
    r.status,
    r.total_amount,
    r.reservation_time,
    p.pharmacy_name
ORDER BY r.reservation_id DESC
"""

        cursor.execute(query, (user_id,))
        reservations = cursor.fetchall()

        return jsonify(reservations), 200

    except Exception as e:
        return jsonify({"error": f"Failed to fetch reservations: {str(e)}"}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()