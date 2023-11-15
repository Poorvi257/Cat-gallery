
# Cat Gallery , Meow?

Welcome to the Cat Gallery app !

## Introduction

A platform where cat enthusiasts can enjoy and share feline-related content. This documentation aims to guide users through the setup and execution of the Cat Gallery app, ensuring a smooth and enjoyable experience.

## Prerequisites

Before you start, ensure you have the following installed:
- Docker: The application runs in Docker containers.
- Node.js and npm: Required for running the Node.js backend.
- PostgreSQL: Necessary if you prefer to run the database outside Docker.

## Setup Instructions

### Step 1: Clone the Repository
First, you need to clone the repository containing the Cat Gallery app to your local machine. Use the following command:
```bash
git clone [REPOSITORY_URL]
```
Replace `[REPOSITORY_URL]` with the actual URL of the Cat Gallery repository.

### Step 2: Environment Setup
The application uses environment variables for configuration. A sample `.env` file is provided in the repository. Ensure that this file is correctly set up with your preferred settings.

```bash
DB_USER=postgres
DB_PASS="123456"
DB_NAME=altbox
DB_PORT=5432
DB_HOST=db

# JWT
JWT_SECRET=secret
JWT_EXPIRES_IN=1d

# TEST
TEST_DB_USER=postgres
TEST_DB_PASS="123456"
TEST_DB_NAME=altbox_test
TEST_DB_PORT=5432
TEST_DB_HOST=db

# Postgres setup docker
POSTGRES_DB=altbox
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456
POSTGRES_PORT=5432
NODE_APP_PORT=3000
```

### Step 3: Docker Compose
Navigate to the directory containing the `docker-compose.yml` file. This file contains the configuration for running both the backend server and the PostgreSQL database in Docker containers.

Run the following command to start the services:
```bash
docker-compose up -d
```

### Step 4: Handling Errors
If you encounter any connectivity issues between Node.js and PostgreSQL on the first run, simply restart the backend Docker container. (Some weird nodejs bug that's bothering connection with postgres server but works after restart)

To restart the backend container, use:
```bash
docker restart [BACKEND_CONTAINER_NAME]
```
Replace `[BACKEND_CONTAINER_NAME]` with the actual name of the backend container.

### Step 5: API Documentation
The API documentation is located in the `docs` folder. It includes comprehensive information with `curl` requests examples.

## Alternative Non-Docker Setup

If you prefer not to use Docker in case people are not experts  (I am Looking in the mirror right now) , follow these steps:

1. **Install PostgreSQL**: Ensure PostgreSQL is installed, configured, and running on your system.

2. **Install Node.js Dependencies**: Navigate to the backend server directory and run:
   ```bash
   npm install
   ```

3. **Run Tests**: To run the predefined tests, execute:
   ```bash
   npx jest
   ```
   This will execute 16 tests, showcasing the functionality of the application.

4. **Start the Server**: Finally, start the server with:
   ```bash
   npm start
   ```
   This will launch the backend server, making the application accessible.

## Troubleshooting

If you encounter issues or require assistance, feel free to contact the developer at poorvi257s@gmail.com.

## Conclusion

By following these detailed steps, you should be able to set up and enjoy the Cat Gallery application seamlessly. Whether you are a seasoned developer or a beginner, this guide aims to provide you with all the necessary information to get the application up and running.
