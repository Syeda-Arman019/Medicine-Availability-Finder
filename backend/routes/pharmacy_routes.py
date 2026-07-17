from flask import Blueprint, request, jsonify
from database.db import get_db_connection

pharmacy_bp = Blueprint("pharmacy", __name__)

@pharmacy_bp.route("/add-pharmacy", methods=["POST"])
def add_pharmacy():
    data = request.get_json()

    name = data["name"]
    address = data["address"]
    city = data["city"]
    phone = data["phone"]
    website = data["website"]

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO pharmacies (name, address, city, phone, website)
        VALUES (%s, %s, %s, %s, %s)
    """, (name, address, city, phone, website))

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Pharmacy added successfully!"
    })