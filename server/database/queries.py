from database.connection_db import connection

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

        This method checks if the database connection is established.
        If not, it calls the `setup` method to configure it. Then, it uses 
        an asynchronous cursor to execute an insertion query into the 
        `users` table of the `ecommerce` database.

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

    async def insert_item(self, name: str, price: str, type: str):
        
        if self.conn is None:
            await self.setup()
        try:
            async with self.conn.cursor() as cursor:
                query = "INSERT INTO ecommerce.items (name, price, type) VALUES (%s, %s, %s)"
                await cursor.execute(query, (name, price, type))
        except Exception as e:
            print(f"Error inserting item: {e}")
        finally:
            if self.conn:
                self.conn.close() 

    async def insert_cart(self, user_id: str, item_id: str, quantity: int):
        
        if self.conn is None:
            await self.setup()
        try:
            async with self.conn.cursor() as cursor:
                query = "INSERT INTO ecommerce.cart (name, price, type) VALUES (%s, %s, %s)"
                await cursor.execute(query, (user_id, item_id, quantity))
        except Exception as e:
            print(f"Error inserting cart: {e}")
        finally:
            if self.conn:
                self.conn.close() 


class SearchQueries:
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

    async def user_data(self, email:str) -> dict | None:
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