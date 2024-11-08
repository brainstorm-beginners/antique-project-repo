import os
from dotenv import load_dotenv

load_dotenv()


class ProjectConfig:
    _db_driver: str = os.getenv("DB_DRIVER")
    _postgres_user: str = os.getenv("POSTGRES_USER")
    _postgres_password: str = os.getenv("POSTGRES_PASSWORD")
    _postgres_database: str = os.getenv("POSTGRES_DATABASE")
    _postgres_host: str = os.getenv("POSTGRES_HOST")
    _postgres_port: int = int(os.getenv("POSTGRES_PORT", 5432))
    _django_secret_key: str = os.getenv("DJANGO_SECRET_KEY")

    @property
    def database_driver(self) -> str:
        return self._db_driver

    @database_driver.getter
    def get_database_driver(self) -> str:
        return self._db_driver

    @property
    def postgres_user(self) -> str:
        return self._postgres_user

    @postgres_user.getter
    def get_postgres_user(self) -> str:
        return self._postgres_user

    @property
    def postgres_password(self) -> str:
        return self._postgres_password

    @postgres_password.getter
    def get_postgres_password(self) -> str:
        return self._postgres_password

    @property
    def postgres_database(self) -> str:
        return self._postgres_database

    @postgres_database.getter
    def get_postgres_database(self) -> str:
        return self._postgres_database

    @property
    def postgres_host(self) -> str:
        return self._postgres_host

    @postgres_host.getter
    def get_postgres_host(self) -> str:
        return self._postgres_host

    @property
    def postgres_port(self) -> int:
        return self._postgres_port

    @postgres_port.getter
    def get_postgres_port(self) -> int:
        return self._postgres_port

    @property
    def django_secret_key(self) -> str:
        return self._django_secret_key

    @django_secret_key.getter
    def get_django_secret_key(self) -> str:
        return self._django_secret_key


    class Config:
        env_file = "C:/Users/User/PycharmProjects/antiqueProject/.env"


project_config = ProjectConfig()