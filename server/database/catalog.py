import asyncio
from queries import InsertQueries

productos = [
    {
        "name": "Camiseta Básica",
        "price": 19.99,
        "category": "camisas",
        "status": "new",
        "image": "https://via.placeholder.com/200",
        "clothe_type": "camisas",
        "public": "adultos",
        "release_date": "2023-01-01",
        "popularity": 5
    },
    {
        "name": "Vestido Floral",
        "price": 49.99,
        "category": "vestidos",
        "status": "new",
        "image": "https://via.placeholder.com/200",
        "clothe_type": "vestidos",
        "public": "adultos",
        "release_date": "2023-02-01",
        "popularity": 3
    }
]

iq = InsertQueries()



async def load_items():
    for item in productos[:2]:
        await iq.insert_item(
            name=item['name'],
            price=item['price'],
            category=item['category'],
            status=item['status'],
            image=item['image'],
            clothe_type=item['clothe_type'],
            public=item['public'],
            release_date=item['release_date'],
            popularity=item['popularity']
        )


# Ejecución de la función asíncrona
async def main():
    await load_items()

# Llamar a la función main usando asyncio.run
if __name__ == "__main__":
    asyncio.run(main())

