import aiomysql
import asyncio

async def connection():
    try:
        conn = await aiomysql.connect(
            host='127.0.0.1',   # El host, cámbialo si es necesario
            port=3306,          # El puerto, cámbialo si es necesario
            user='root',        # Tu usuario de MySQL
            password='isuperrubick69',  # Tu contraseña de MySQL
            db='ecommerce',     # El esquema de la base de datos
            autocommit=True
        )         
        return conn
    except Exception as e: 
        print(f"Error al conectar a la base de datos: {e}")
        return None


