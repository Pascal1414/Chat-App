# ConsoleChatApp

## Run using Docker

To run the backend and database run:

```bash
docker-compose up
```

or

```bash
docker-compose up --build --force-recreate
```
The server may try to connect to the database, while its not ready for connections. Rerun the docker-compose command may help. 