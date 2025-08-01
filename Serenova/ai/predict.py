import pickle
import numpy as np

with open("model.pkl", "rb") as file:
    model = pickle.load(file)

def predict_safety_score(lat1, lon1, lat2, lon2):
    input_data = np.array([[lat1, lon1], [lat2, lon2]])

    predictions = model.predict(input_data)

    avg_safety_score = np.mean(predictions)

    return avg_safety_score

if __name__ == "__main__":
    # Test Prediction
    lat1, lon1 = 28.7041, 77.1025  
    lat2, lon2 = 19.0760, 72.8777  

    safety_score = predict_safety_score(lat1, lon1, lat2, lon2)
    print(f"Predicted Safety Score: {safety_score:.2f}")
