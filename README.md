# jk-poc-ingestion

## Description
`jk-poc-ingestion` is a microservice responsible for ingesting and processing data in the JK-POC system. It utilizes NestJS and Kafka for event-driven processing.

## Installation

Ensure you have Node.js installed (version 16+ recommended). Clone the repository and install dependencies:

```sh
npm install
```

## Environment Variables

Create a `.env` file in the root directory and define the required environment variables (refer to `.env.example` for a detailed example):

```env
KAFKA_BROKER=kafka:9092
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

## Running the Application

### Development Mode
```sh
npm run start:dev
```

### Production Mode
```sh
npm run build
npm run start:prod
```

## Database Migrations

### Create a New Migration
```sh
npm run task:migration:create --name=MigrationName
```

### Generate Migrations Based on Entities
```sh
npm run task:migration:generate --name=MigrationName
```

### Run Migrations
```sh
npm run task:migration:run
```

### Revert Migrations
```sh
npm run task:migration:revert
```

## Testing

Run unit tests:
```sh
npm run test
```

Run end-to-end tests:
```sh
npm run test:e2e
```

## API Documentation

Swagger documentation is available when the service is running:

```
http://localhost:3000/api
```

