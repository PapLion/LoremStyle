from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import auth, home, support, items, catalog, cart
from pathlib import Path
from dotenv import load_dotenv


load_dotenv('JWT/.env')
app = FastAPI()

class FastServer:
    def __init__(self, routers: list[APIRouter]) -> None:
        """
        Initializes an instance of FastServer.
        This constructor sets the initial values of the instance
        and executes the necessary functions to configure
        the FastAPI application.
        
        Args:
            routers (list[APIRouter]): List of routers to be added to the application.
        """
        self.set_static()
        self.set_middleware()
        self.set_routers(routers)

    def set_static(self) -> None:
        """
        Configures the path to serve static files.
        This function checks if the static files directory exists.
        If it does not exist, an error is raised. Static files are mounted
        at the '/static' path.
        
        Raises:
            RuntimeError: If the static files directory does not exist.
        """
        static_dir = Path(__file__).resolve().parent / "../Client/static"
        if not static_dir.exists():
            raise RuntimeError(f"Directory '{static_dir}' does not exist")
        app.mount("/static", StaticFiles(directory=static_dir), name="static")
        app.mount("/cart/static", StaticFiles(directory=static_dir), name="static")
        app.mount("/cart/payment/static", StaticFiles(directory=static_dir), name="static")

    def set_middleware(self) -> None:
        """
        Configures CORS middleware for the application.
        This function restricts access to resources from different origins.
        By default, all origins, credentials, methods, and headers are allowed.
        Modify as necessary.
        
        Default configuration:
            - Origins: All allowed.
            - Credentials: All allowed.
            - Methods: All allowed.
            - Headers: All allowed.
        """
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"], 
            allow_headers=["*"],
        )

    def set_routers(self, routers: list[APIRouter]) -> None:
        """
        Adds routers to the FastAPI application.
        This function includes the routes provided in the routers parameter
        to the application.
        
        Args:
            routers (list[APIRouter]): List of routers to add to the application.
        """
        for r in routers:
            app.include_router(r)

# List of routers.
routers = [auth.app, home.app, cart.app, support.app, items.app, catalog.app]

# FastServer object to which we pass the list of
# routers as a parameter.
server = FastServer(routers)