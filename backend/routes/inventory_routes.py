from flask import Blueprint, request, jsonify
from database.db import get_db_connection

inventory_bp = Blueprint("inventory", __name__)


@inventory_bp.route("/add-inventory", methods=["POST"])
def add_inventory():

    data = request.get_json()

    pharmacy_id = data["pharmacy_id"]
    medicine_id = data["medicine_id"]
    price = data["price"]
    quantity = data["quantity"]
    availability = data["availability"]

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO inventory
        (pharmacy_id, medicine_id, price, quantity, availability)
        VALUES (%s, %s, %s, %s, %s)
    """,
    (
        pharmacy_id,
        medicine_id,
        price,
        quantity,
        availability
    ))

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Inventory added successfully!"
    })