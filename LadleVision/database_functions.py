import mysql.connector


def insert_into_table():
    # Replace these with your actual MySQL server credentials
    host = '127.0.0.1'
    user = 'root'
    password = '9673497497'
    database_to_change_to = 'bank'

    # Connect to the MySQL server
    conn = mysql.connector.connect(host=host, user=user, password=password)

    # Create a cursor object to execute SQL queries
    cursor = conn.cursor()

    try:
        # Use the desired database
        cursor.execute(f"USE {database_to_change_to}")

        # Your SQL queries within the specified database
        # For example, you can execute a SELECT query
        cursor.execute("INSERT INTO customers VALUES (3, 'Samarth', 1234567891, 100)")
        conn.commit()

        # Fetch and print the results
        # results = cursor.fetchall()
        # for row in results:
        #     print(row)

    except mysql.connector.Error as err:
        print(f"Error: {err}")

    finally:
        # Close the cursor and connection
        cursor.close()
        conn.close()
