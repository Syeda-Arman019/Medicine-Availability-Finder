from flask import Blueprint, jsonify
from database.db import get_db_connection

pharmacy_bp = Blueprint("pharmacy", __name__)


# Get All Pharmacies
@pharmacy_bp.route("/pharmacies", methods=["GET"])
def get_pharmacies():

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM pharmacies")

    pharmacies = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(pharmacies)