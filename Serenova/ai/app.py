from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['https://serenova-eta.vercel.app'])

with open("./model_coords.pkl", "rb") as file:
    model_coords = pickle.load(file)

with open("./model_full.pkl", "rb") as file:
    model_full = pickle.load(file)

full_features = [
    "Latitude", "Longitude", "Light Intensity", "Traffic Density",
    "Crowd Density", "Crime Rate", "Accident Rate"
]


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("Received request:", data)  # Optional: debugging

    use_full_model = data.get("use_full_model", False)

    if use_full_model:
        missing_features = [feat for feat in full_features if feat not in data]
        if missing_features:
            return jsonify({"error": f"Missing features: {', '.join(missing_features)}"}), 400

        input_data = np.array([[data[feat] for feat in full_features]])
        prediction = model_full.predict(input_data)[0]

    else:
        if 'lat1' not in data or 'lon1' not in data or 'lat2' not in data or 'lon2' not in data:
            return jsonify({"error": "Missing latitude or longitude values"}), 400

        lat1, lon1 = data['lat1'], data['lon1']
        lat2, lon2 = data['lat2'], data['lon2']

        input_data = np.array([[lat1, lon1], [lat2, lon2]])
        predictions = model_coords.predict(input_data)
        prediction = float(np.mean(predictions))  # ensure serializable

    return jsonify({"safety_score": prediction})


if __name__ == '__main__':
    app.run(debug=True)
