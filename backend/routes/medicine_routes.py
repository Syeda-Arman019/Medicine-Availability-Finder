from flask import Blueprint, request, jsonify
from database.db import get_db_connection

medicine_bp = Blueprint("medicine", __name__)

@medicine_bp.route("/add-medicine", methods=["POST"])
def add_medicine():
    data = request.get_json()

    medicine_name = data["medicine_name"]
    company = data["company"]
    description = data["description"]

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO medicines (medicine_name, company, description)
        VALUES (%s, %s, %s)
    """, (medicine_name, company, description))

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Medicine added successfully!"
    })