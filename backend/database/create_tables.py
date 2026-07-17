from db import get_db_connection

def create_tables():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS pharmacies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address VARCHAR(255),
        city VARCHAR(100),
        phone VARCHAR(20),
        website VARCHAR(255)
    )
    """)
    cursor.execute("""
CREATE TABLE IF NOT EXISTS medicines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    description TEXT
)
""")
    cursor.execute("""
CREATE TABLE IF NOT EXISTS inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pharmacy_id INT,
    medicine_id INT,
    price DECIMAL(10,2),
    quantity INT,
    availability VARCHAR(50),

    FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(id),
    FOREIGN KEY (medicine_id) REFERENCES medicines(id)
)
""")

    connection.commit()
    cursor.close()
    connection.close()

    print("✅ Pharmacies table created successfully!")

if __name__ == "__main__":
    create_tables()