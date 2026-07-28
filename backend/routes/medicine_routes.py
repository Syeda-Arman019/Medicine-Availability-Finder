from flask import Blueprint, request, jsonify
from database.db import get_db_connection

medicine_bp = Blueprint("medicine", __name__)

# Get All Medicines
@medicine_bp.route("/medicines", methods=["GET"])
def get_medicines():

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM medicines")

    medicines = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(medicines)