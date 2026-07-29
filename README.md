## Preview

![Pokemon Search App](./images/app-preview.png)

# Pokémon Search App

A full-stack web application that allows users to search for Pokémon using the PokeAPI while persisting successful searches in a PostgreSQL database. The project demonstrates a modern client-server architecture using React, Flask, PostgreSQL, Docker, and REST APIs.

---

## Overview

This application was built to strengthen my understanding of backend software development by integrating a React frontend with a Python Flask backend and a relational database. Users can search for any Pokémon, view live data retrieved from the PokeAPI, and automatically store each successful search in PostgreSQL.

The project emphasizes backend architecture, API development, database persistence, and containerized development using Docker.

---

## Features

- Search for any Pokémon by name
- Retrieve live Pokémon data from the PokeAPI
- Store successful searches in PostgreSQL
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

This application follows a client-server architecture.

- **React** provides the user interface.
- **Flask** exposes REST API endpoints and handles business logic.
- **PokeAPI** supplies Pokémon data.
- **PostgreSQL** stores successful Pokémon searches.
- **Docker** manages the PostgreSQL database in a containerized environment.

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
           ┌─────────┴─────────┐
           │                   │
           ▼                   ▼
      PostgreSQL           PokeAPI
   Store Search Data    Retrieve Pokémon
```

---

## Request Flow

1. The user enters a Pokémon name in the React application.
2. React sends a request to the Flask backend.
3. Flask requests Pokémon data from the PokeAPI.
4. If the Pokémon exists:
   - The search is saved to PostgreSQL.
   - The Pokémon data is returned to the frontend.
5. React displays the Pokémon information to the user.

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

The backend automatically creates the following table if it does not already exist.

| Column | Type | Description |
|---------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique identifier |
| pokemon_name | VARCHAR(50) | Pokémon searched |
| searched_at | TIMESTAMP | Timestamp of search |

---

## Running the Application

### Clone the Repository

```bash
git clone https://github.com/yourusername/pokemon-app.git

cd pokemon-app
```

### Start PostgreSQL

```bash
docker compose up -d
```

### Start the Flask Backend

```bash
cd server

source venv/bin/activate

python3 app.py
```

The backend will run on:

```
http://127.0.0.1:5000
```

### Start the React Frontend

```bash
cd client

npm install

npm start
```

The frontend will run on:

```
http://localhost:3000
```

---

## Key Backend Concepts Demonstrated

- REST API development with Flask
- HTTP request and response handling
- External API integration
- PostgreSQL database connectivity
- SQL execution using psycopg2
- Database persistence
- Client-server architecture
- Docker containerization
- Cross-Origin Resource Sharing (CORS)
- JSON serialization

---

## Project Structure

```
pokemon-app/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── app.py
│   ├── requirements.txt
│   ├── venv/
│   └── ...
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## Acknowledgements

- Pokémon data provided by the **PokeAPI**.
- Built as a personal project to practice full-stack software engineering concepts.
