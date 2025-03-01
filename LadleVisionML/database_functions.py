import time

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

        cursor.execute(
            f"INSERT INTO frame (LadleNo, Temperature, Location) VALUES ({LadleNo}, {Location} , {Temperature});")
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
        cursor.execute(f"SELECT Location from ladle WHERE LadleNo = {LadleNo};")
        results = cursor.fetchall()[0][0]
        print(results)

        if results is None:
            cursor.execute(
                f"UPDATE ladle SET Location = {newLocation}, LastUpdated = CURRENT_TIMESTAMP WHERE LadleNo = {LadleNo};")
        else:
            if results != newLocation:
                cursor.execute(
                    f"UPDATE ladle SET Location = {newLocation}, LastUpdated = CURRENT_TIMESTAMP WHERE LadleNo = {LadleNo};")
        # print("prevLocation:",prevLocation);

        # print(LadleNo)
        conn.commit()


    except mysql.connector.Error as err:
        print(f"Error: {err}")

    finally:
        # Close the cursor and connection
        cursor.close()
        conn.close()


# update_ladle_location(2,2)

def updateCircularTime(LadleNo, location):
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

        if location == 9:
            # lasttime = currenttime
            cursor.execute(
                f"UPDATE ladle SET LastLocationTime = CURRENT_TIMESTAMP WHERE LadleNo = {LadleNo};")
        else:
            cursor.execute(
                f"SELECT LastLocationTime, FirstLocationTime, CURRENT_TIMESTAMP from ladle WHERE LadleNo = {LadleNo};")
            result = cursor.fetchall()
            print(result)

            lastlocationtime = None
            firstlocationtime = None

            if result[0][0] != None:
                lastlocationtime = result[0][0]

            if result[0][1] != None:
                firstlocationtime = result[0][1]

            currenttime = result[0][2]

            if lastlocationtime is None:
                cursor.execute(
                    f"UPDATE ladle SET FirstLocationTime = '{currenttime}' WHERE LadleNo = {LadleNo};")
            elif firstlocationtime is None:
                cursor.execute(
                    f"UPDATE ladle SET FirstLocationTime = '{currenttime}' WHERE LadleNo = {LadleNo};")
            elif currenttime >= lastlocationtime:
                cursor.execute(
                    f"UPDATE ladle SET CircularTime = TIMESTAMPDIFF(SECOND, '{firstlocationtime}', '{currenttime}') WHERE LadleNo = {LadleNo};")
                cursor.execute(f"UPDATE ladle SET FirstLocationTime = '{currenttime}' WHERE LadleNo = {LadleNo};")
                cursor.execute(f"UPDATE ladle SET FirstLocationTime = NULL WHERE LadleNo = NULL;")
            # else:
                cursor.execute(
                    f"UPDATE ladle SET FirstLocationTime = '{currenttime}' WHERE LadleNo = {LadleNo};")

        # Your SQL queries within the specified database
        # For example, you can execute a SELECT query
        cursor.execute(f"SELECT Location from ladle WHERE LadleNo = {LadleNo};")
        results = cursor.fetchall()[0][0]
        print(results)

        # print(LadleNo)
        conn.commit()


    except mysql.connector.Error as err:
        print(f"Error: {err}")

    finally:
        # Close the cursor and connection
        cursor.close()
        conn.close()

#
# updateCircularTime(2, 1)
# time.sleep(1)
# print("Finish")
# updateCircularTime(2, 3)
# time.sleep(3)
# print("Finish")
# updateCircularTime(2, 1)
# print("Finish")
