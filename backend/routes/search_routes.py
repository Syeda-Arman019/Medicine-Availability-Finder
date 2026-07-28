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
        m.medicine_name,
        p.pharmacy_name,
        p.address,
        p.phone,
        s.quantity

    FROM stock s

    JOIN medicines m
    ON s.medicine_id = m.medicine_id

    JOIN pharmacies p
    ON s.pharmacy_id = p.pharmacy_id

    WHERE m.medicine_name LIKE %s
    """

    cursor.execute(query, ("%" + medicine_name + "%",))

    results = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(results)