import pytest
from database.connection_db import connection
from aiomysql.connection import Connection


@pytest.mark.asyncio
async def test_connection_with_database():
    """
    Test the connection to the database using an async function.

    This test checks whether the connection to the database established
    using the `connection` function is of type `Connection`. If it fails, it 
    will raise an exception indicating the failure of the database connection.
    """
    try:
        connection_database = await connection()
        assert isinstance(connection_database, Connection), "Connection is not an instance of aiomysql Connection"
    except Exception as e:
        pytest.fail(f"Database connection failed: {e}")
    finally:
        if isinstance(connection_database, Connection):
            connection_database.close()
