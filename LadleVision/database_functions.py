import mysql.connector


# LadleNo = 5
# Location = 9
# Temperature = 25


def insert_into_table(LadleNo, Location, Temperature):
    # Replace these with your actual MySQL server credentials
    host = '127.0.0.1'
    user = 'root'
    password = '9673497497'
    database_to_change_to = 'ladle_vision'

    # Connect to the MySQL server
    conn = mysql.connector.connect(host=host, user=user, password=password)

    # Create a cursor object to execute SQL queries
    cursor = conn.cursor()

    try:
        # Use the desired database
        cursor.execute(f"USE {database_to_change_to};")

        # Your SQL queries within the specified database
        # For example, you can execute a SELECT query

        cursor.execute(f"INSERT INTO frame (LadleNo, Temperature, Location) VALUES ({LadleNo}, {Location} , {Temperature});")
        # print(LadleNo)
        conn.commit()

        # print(LadleNo)

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


# insert_into_table(5, 9.3, 25)


def update_ladle_location(LadleNo, newLocation):
    # Replace these with your actual MySQL server credentials
    host = '127.0.0.1'
    user = 'root'
    password = '9673497497'
    database_to_change_to = 'ladle_vision'

    # Connect to the MySQL server
    conn = mysql.connector.connect(host=host, user=user, password=password)

    # Create a cursor object to execute SQL queries
    cursor = conn.cursor()

    try:
        # Use the desired database
        cursor.execute(f"USE {database_to_change_to};")

        # Your SQL queries within the specified database
        # For example, you can execute a SELECT query

        cursor.execute(f"UPDATE ladle SET Location = {newLocation} WHERE {LadleNo} = ?;")
        # print(LadleNo)
        conn.commit()


    except mysql.connector.Error as err:
        print(f"Error: {err}")

    finally:
        # Close the cursor and connection
        cursor.close()
        conn.close()