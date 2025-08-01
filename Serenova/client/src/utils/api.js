import axios from "axios";
import { PYTHON_APP_URL } from "../utils/config";
export const predictSafetyScore = async (lat1, lon1, lat2, lon2) => {
  try {
    
    const response = await axios.post(PYTHON_APP_URL + "/predict", {
      lat1,
      lon1,
      lat2,
      lon2,
    });
    return response.data.safety_score;
  } catch (err) {
    console.log(err);
  }
};
