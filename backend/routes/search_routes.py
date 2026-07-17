from flask import Blueprint, request, jsonify
from database.db import get_db_connection

search_bp = Blueprint("search", __name__)


@search_bp.route("/search-medicine", methods=["GET"])
def search_medicine():

    medicine_name = request.args.get("name")

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
    SELECT 
        medicines.medicine_name AS medicine,
        pharmacies.name AS pharmacy,
        inventory.price,
        inventory.quantity,
        inventory.availability

    FROM inventory

    JOIN medicines 
    ON inventory.medicine_id = medicines.id

    JOIN pharmacies
    ON inventory.pharmacy_id = pharmacies.id

    WHERE medicines.medicine_name LIKE %s
    """

    cursor.execute(query, ("%" + medicine_name + "%",))

    results = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(results)