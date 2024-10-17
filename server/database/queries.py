from database.connection_db import connection


class DropQueries:
    """
    A class to handle deletion queries from the database.
    This class manages the database connection and provides methods
    to delete data from ecommerce tables.
    """
    
    def __init__(self) -> None:
        self.conn = None

    async def setup(self):
        """Establishes a connection to the database."""
        self.conn = await connection()

    async def row_drop(self, id: int, table: str) -> dict | None:
        """Deletes a row from the specified table by its ID.

        Args:
            id (int): The ID of the row to delete.
            table (str): The name of the table from which to delete the row.

        Returns:
            dict | None: Returns True if deletion was successful, None otherwise.
        """
        if self.conn is None:
            await self.setup()
        try:
            async with self.conn.cursor() as cursor:
                query = f"DELETE FROM ecommerce.{table} WHERE id = %s"
                await cursor.execute(query, (id,))
        except Exception as e:
            print(f"Error deleting: {e}")
            return None
        finally:
            if self.conn:
                self.conn.close()
        return True

    async def delete_item_from_cart(self, user_id: int, item_id: int):
        """Deletes an item from the user's cart.
        Args:
            user_id (int): The ID of the user.
            item_id (int): The ID of the item to remove from the cart.
        Raises:
            Exception: If an error occurs during the deletion, the error is printed.
        Finally, it closes the database connection.
        """
        if self.conn is None:
            await self.setup()
        try:
            async with self.conn.cursor() as cursor:
                query = "DELETE FROM ecommerce.cart WHERE user_id = %s AND item_id = %s LIMIT 1"
                await cursor.execute(query, (user_id, item_id))
        except Exception as e:
            print(f"Error deleting item from cart: {e}")
        finally:
            if self.conn:
                self.conn.close()


class InsertQueries:
    """
    A class to handle insertion queries into the database.
    This class manages the database connection and provides methods
    to insert data into ecommerce tables.
    """
    
    def __init__(self) -> None:
        self.conn = None

    async def setup(self):
        """Establishes a connection to the database."""
        self.conn = await connection()

    async def insert_user(self, name: str, email: str, password: str):
        """
        Inserts a new user into the database.
        
        Args:
            name (str): The name of the user to insert.
            email (str): The email address of the user to insert.
            password (str): The password of the user to insert.
        
        Raises:
            Exception: If an error occurs during the insertion, the error is printed.
        
        Finally, it closes the database connection.
        """
        if self.conn is None:
            await self.setup()
        try:
            async with self.conn.cursor() as cursor:
                query = "INSERT INTO ecommerce.users (name, email, password) VALUES (%s, %s, %s)"
                await cursor.execute(query, (name, email, password))
        except Exception as e:
            print(f"Error inserting user: {e}")
        finally:
            if self.conn:
                self.conn.close()

    async def insert_item(self, name: str, price: float, category: str, condition: str, image: str, clothe_type: str, audience: str, release_date: str, popularity: int) -> bool:
        """Inserts a new item into the items table.

        Args:
            name (str): The name of the item.
            price (float): The price of the item.
            category (str): The category of the item.
            condition (str): The condition of the item.
            image (str): The image URL of the item.
            clothe_type (str): The type of clothing.
            audience (str): For specific audiences.
            release_date (str): The release date of the item.
            popularity (int): The popularity rating of the item.

        Returns:
            dict | None: Returns a dictionary with item details if insertion was successful, None otherwise.
        """
        if self.conn is None:
            await self.setup()
        try:
            async with self.conn.cursor() as cursor:
                query = """INSERT INTO ecommerce.items (name, price, category, condition, image, clothe_type, audience, release_date, popularity) 
                           VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
                await cursor.execute(query, (name, price, category, condition, image, clothe_type, audience, release_date, popularity,))
                item_id = cursor.lastrowid
        except Exception as e:
            print(f"Error inserting item: {e}")
            return None
        finally:
            if self.conn:
                self.conn.close()
        return {
            "id": item_id,
            "name": name,
            "price": price,
            "category": category,
            "condition": condition,
            "image": image,
            "clothe_type": clothe_type,
            "audience": audience,
            "release_date": release_date,
            "popularity": popularity
        }

    async def insert_item_from_cart(self, user_id: int, item_id: int, quantity: int):
        """Inserts a new item into the user's cart.

        Args:
            user_id (str): The ID of the user.
            item_id (str): The ID of the item.
            quantity (int): The quantity of the item to add to the cart.
        
        Raises:
            Exception: If an error occurs during the insertion, the error is printed.
        
        Finally, it closes the database connection.
        """
        if self.conn is None:
            await self.setup()
        try:
            async with self.conn.cursor() as cursor:
                query = "INSERT INTO ecommerce.cart (user_id, item_id, quantity) VALUES (%s, %s, %s)"
                await cursor.execute(query, (user_id, item_id, quantity))
        except Exception as e:
            print(f"Error inserting cart: {e}")
        finally:
            if self.conn:
                self.conn.close()

    async def insert_all_items_in_db(self, data):
    # Insertar datos en la tabla

        if self.conn is None:
            await self.setup()
        try:
            async with self.conn.cursor() as cursor:
                insert_query = """
                INSERT INTO items (name, price, category, condition, image, clothe_type, audience, release_date, popularity)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                
                for item in data:
                    await cursor.execute(insert_query, (
                        item["name"],
                        item["price"],
                        item["category"],
                        item["condition"],
                        item["image"],
                        item["clothe_type"],
                        item["audience"],
                        item["release_date"],
                        item["popularity"]
                    ))
                    
        except Exception as e:
            print(f"Error inserting cart: {e}")
        finally:
            if self.conn:
                self.conn.close()


class SearchQueries:
    """
    A class to handle search queries in the database.
    This class manages the database connection and provides methods
    to retrieve data from ecommerce tables.
    """
    
    def __init__(self) -> None:
        self.conn = None

    async def setup(self):
        """Establishes a connection to the database."""
        self.conn = await connection()

    async def user_data(self, email: str) -> dict | None:
        """Retrieves user data by email.

        Args:
            email (str): The email of the user to search.

        Returns:
            dict | None: Returns user data as a dictionary if found, None otherwise.
        """
        if self.conn is None:
            await self.setup()
        try:
            async with self.conn.cursor() as cursor:
                query = "SELECT * FROM ecommerce.users WHERE email = %s"
                await cursor.execute(query, (email,))
                response = await cursor.fetchone()
                if isinstance(response, tuple):
                    response_dict = {
                        "id": response[0],
                        "name": response[1],
                        "email": response[2],
                        "password": response[3]
                    }
                    return response_dict
                return None
        except Exception as e:
            print(f"Error searching user: {e}")
        finally:
            if self.conn:
                self.conn.close()

    async def latest_items(self) -> dict | None:
        """Retrieves the latest items added to the database.

        Returns:
            list | None: Returns a list of the latest items as dictionaries if found, None otherwise.
        """
        if self.conn is None:
            await self.setup()
        try:
            async with self.conn.cursor() as cursor:
                query = "SELECT * FROM ecommerce.items ORDER BY id DESC LIMIT 3"
                await cursor.execute(query)
                response = await cursor.fetchall()
                if isinstance(response, tuple):
                    empty_list = []
                    for data in response:
                        data_dict = {
                            "id": data[0],
                            "name": data[1],
                            "price": float(data[2]),
                            "category": data[3],
                            "condition": data[4],
                            "image": data[5],
                            "clothe_type": data[6],
                            "audience": data[7],
                            "release_date": data[8],
                            "popularity": data[9]
                        }
                        empty_list.append(data_dict)
                    return empty_list
                return None
        except Exception as e:
            print(f"Error searching latest item: {e}")
        finally:
            if self.conn:
                self.conn.close()

    async def all_items(self) -> dict | None:
        if self.conn is None:
            await self.setup()
        try:
            async with self.conn.cursor() as cursor:
                query = "SELECT * FROM ecommerce.items ORDER BY id DESC"
                await cursor.execute(query)
                response = await cursor.fetchall()
                if isinstance(response, tuple):
                    empty_list = []
                    for data in response:
                        data_dict = {
                            "id": data[0],
                            "name": data[1],
                            "price": float(data[2]),
                            "category": data[3],
                            "condition": data[4],
                            "image": data[5],
                            "clothe_type": data[6],
                            "audience": data[7],
                            "release_date": data[8],
                            "popularity": data[9]
                        }
                        empty_list.append(data_dict)
                    return empty_list
                return None
        except Exception as e:
            print(f"Error searching all item: {e}")
        finally:
            if self.conn:
                self.conn.close()

    async def items_cart(self, user_id) -> dict | None:
        if self.conn is None:
            await self.setup()
        try:
            async with self.conn.cursor() as cursor:
                query = """
                            SELECT i.id, i.name, i.price, i.audience, i.image, c.quantity	
                            FROM items i
                            JOIN cart c ON i.id = c.item_id
                            WHERE c.user_id = %s
                        """
                await cursor.execute(query, user_id)
                response = await cursor.fetchall()
                if isinstance(response, tuple):
                    empty_list = []
                    for data in response:
                        data_dict = {
                            "id": data[0],
                            "name": data[1],
                            "price": float(data[2]),
                            "audience": data[3],
                            "image": data[4],
                            "quantity": data[5]
                        }
                        empty_list.append(data_dict)
                    return empty_list
                return None
        except Exception as e:
            print(f"Error searching all item: {e}")
        finally:
            if self.conn:
                self.conn.close()

