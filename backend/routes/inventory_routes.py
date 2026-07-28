from flask import Blueprint, jsonify
from database.db import get_db_connection

inventory_bp = Blueprint("inventory", __name__)


# Get Medicine Stock Availability
@inventory_bp.route("/stock", methods=["GET"])
def get_stock():

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT 
            s.stock_id,
            m.medicine_name,
            p.pharmacy_name,
            p.address,
            s.quantity
        FROM stock s
        JOIN medicines m 
        ON s.medicine_id = m.medicine_id
        JOIN pharmacies p 
        ON s.pharmacy_id = p.pharmacy_id
    """)

    stock = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(stock)