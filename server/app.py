from flask import Flask, jsonify
import requests

app = Flask(__name__)

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

    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)