## Preview

![Pokemon Search App](./images/app-preview.png)

# Pokémon Search App

A full-stack web application that allows users to search for Pokémon using the PokeAPI while persisting successful searches in a PostgreSQL database. The project demonstrates a modern client-server architecture using React, Flask, PostgreSQL, Apache Kafka, Docker, and REST APIs.

---

## Overview

This application was built to strengthen my understanding of backend software development by integrating a React frontend with a Python Flask backend and a relational database.

Users can search for any Pokémon, view live data retrieved from the PokeAPI, and automatically store successful searches in PostgreSQL.

To demonstrate modern backend architecture, successful searches also publish events to Apache Kafka. A dedicated Kafka consumer processes those events asynchronously to maintain real-time analytics, separating user requests from background processing.

The project emphasizes REST API development, event-driven architecture, asynchronous messaging, database persistence, and containerized development using Docker.

---

## Features

- Search for any Pokémon by name
- Retrieve live Pokémon data from the PokeAPI
- Store successful searches in PostgreSQL
- Event-driven architecture using Apache Kafka
- Kafka producer publishes Pokémon search events
- Kafka consumer processes events asynchronously
- Real-time search analytics using PostgreSQL UPSERTs
- RESTful API built with Flask
- Dockerized PostgreSQL database
- Database management using pgAdmin
- CORS enabled for frontend and backend communication

---

## Tech Stack

### Frontend

- React
- JavaScript (ES6+)
- HTML5
- CSS3

### Backend

- Python
- Flask
- Flask-CORS
- Requests
- Apache Kafka (Producer & Consumer)

### Database

- PostgreSQL
- psycopg2

### Development Tools

- Docker
- Docker Compose
- pgAdmin
- Git
- GitHub
- VS Code
- WSL (Ubuntu)

---

## Architecture

This application follows a client-server architecture with asynchronous event processing.

- **React** provides the user interface.
- **Flask** exposes REST API endpoints and handles business logic.
- **PokeAPI** supplies Pokémon data.
- **PostgreSQL** stores Pokémon searches.
- **Apache Kafka** distributes search events.
- **Kafka Consumer** processes analytics independently.
- **Docker** manages the PostgreSQL and Kafka containers.

```
                    User
                      │
                      ▼
               React Frontend
                      │
              HTTP GET Request
                      │
                      ▼
               Flask Backend
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
     PostgreSQL   PokeAPI    Kafka Producer
   Store Searches Retrieve Data      │
                                     ▼
                           pokemon-searches Topic
                                     │
                                     ▼
                             Kafka Consumer
                                     │
                                     ▼
                      PostgreSQL Analytics Table
```

---

## Request Flow

1. The user enters a Pokémon name in the React application.
2. React sends a request to the Flask backend.
3. Flask requests Pokémon data from the PokeAPI.
4. If the Pokémon exists:
   - The search is stored in PostgreSQL.
   - A Kafka producer publishes a `pokemon-searches` event.
   - The Pokémon data is returned to the frontend.
5. A Kafka consumer listens for search events.
6. The consumer updates the analytics table using PostgreSQL UPSERTs.
7. React displays the Pokémon information to the user.

---

## Event-Driven Analytics

The application uses Apache Kafka to decouple analytics processing from the Flask API.

When a successful Pokémon search occurs:

1. Flask stores the search in PostgreSQL.
2. Flask publishes a search event to the `pokemon-searches` Kafka topic.
3. A Kafka consumer listens for incoming events.
4. The consumer updates the `pokemon_search_counts` table using PostgreSQL UPSERTs (`ON CONFLICT DO UPDATE`).

This asynchronous architecture separates user requests from background processing and demonstrates a scalable backend design commonly used in distributed systems.

---

## API

### Search for a Pokémon

```
GET /pokemon/<pokemon_name>
```

Example:

```
GET /pokemon/pikachu
```

Example Response:

```json
{
  "name": "pikachu",
  "height": 4,
  "weight": 60
}
```

---

## Database Schema

### Pokémon Search History

| Column | Type | Description |
|---------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique identifier |
| pokemon_name | VARCHAR(50) | Pokémon searched |
| searched_at | TIMESTAMP | Timestamp of search |

### Search Analytics

| Column | Type | Description |
|---------|------|-------------|
| pokemon_name | VARCHAR(50) PRIMARY KEY | Pokémon name |
| search_count | INTEGER | Total number of successful searches |

---

## Key Backend Concepts Demonstrated

- REST API development with Flask
- HTTP request and response handling
- External API integration
- PostgreSQL database connectivity
- SQL execution using psycopg2
- PostgreSQL UPSERTs (`ON CONFLICT DO UPDATE`)
- Apache Kafka Producers
- Apache Kafka Consumers
- Event-driven architecture
- Asynchronous background processing
- Client-server architecture
- Docker containerization
- Cross-Origin Resource Sharing (CORS)
- JSON serialization

---


## Acknowledgements

- Pokémon data provided by the **PokeAPI**.
- Built as a personal project to strengthen full-stack software engineering, backend architecture, and event-driven system design.