from flask import Flask, jsonify
from flask_cors import CORS
import requests
import psycopg2
from kafka import KafkaProducer
import json

app = Flask(__name__)
CORS(app)

conn = psycopg2.connect(
    host="localhost",
    database="pokemon_db",
    user="postgres",
    password="password",
    port=5432,
)

cursor = conn.cursor()

producer = KafkaProducer(
    bootstrap_servers="localhost:9092",
    # connect to kafka broker running on port 9092
    value_serializer=lambda v: json.dumps(v).encode("utf-8")
)
# print("✅ Connected to PostgreSQL!")
cursor.execute("SELECT current_database();")
print(cursor.fetchone())

cursor.execute("""
CREATE TABLE IF NOT EXISTS pokemon_searches(
id SERIAL PRIMARY KEY,
pokemon_name VARCHAR(50),
searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

conn.commit()
print("✅ Table ready!")


@app.route("/")
def home():
    return jsonify({"message": "Pokemon API is running!"})

@app.route("/pokemon/<name>")
def get_pokemon(name):
    response = requests.get(
        f"https://pokeapi.co/api/v2/pokemon/{name.lower()}"
    )

    if response.status_code != 200:
        return jsonify({"error": "Pokemon not found"}), 404

    cursor.execute(
        """
        INSERT INTO pokemon_searches(pokemon_name)
        VALUES (%s)
        """,
        (name.lower(),)
    )

    conn.commit()

    producer.send(
        "pokemon-searches",
        {
            "pokemon": name.lower()
        }
    )

    producer.flush()

    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)