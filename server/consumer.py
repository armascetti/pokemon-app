from kafka import KafkaConsumer
import psycopg2
import json

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="pokemon_db",
    user="postgres",
    password= "password",
    host="localhost",
    port="5432"
)

cursor = conn.cursor()

# connect to Kakfa 
consumer = KafkaConsumer(
    "pokemon-searches",
    bootstrap_servers="localhost:9092",
    auto_offset_reset="earliest",
    group_id="analytics-group",
    value_deserializer=lambda m: json.loads(m.decode("utf-8")
                                            )
)


print("🎧 Waiting for Pokémon searches...\n")

for message in consumer: 
    pokemon = message.value["pokemon"]

    cursor.execute(
        """
        INSERT INTO pokemon_search_counts (pokemon_name, search_count)
        VALUES (%s, 1)
        ON CONFLICT (pokemon_name)
        DO UPDATE
        SET search_count = pokemon_search_counts.search_count + 1; 
        """,
        (pokemon,)
    )

    conn.commit()


    print(f"Updated search count for {pokemon}")