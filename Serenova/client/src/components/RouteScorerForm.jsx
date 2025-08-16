import axios from "axios";
import { useState, useEffect } from "react";
import { PYTHON_APP_URL, SERVER_URL } from "../utils/config";

const RouteScorerForm = () => {
  const [formData, setFormData] = useState({
    currentLat: "",
    currentLong: "",
    destination: "",
    destLat: "",
    destLong: "",
    lightIntensity: "",
    trafficDensity: "",
    crowdDensity: "",
    crimeRate: "",
    accidentRate: "",
  });

  const [autoLocate, setAutoLocate] = useState(false);
  const [safetyScore, setSafetyScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ----------------- Geolocation -----------------
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          currentLat: position.coords.latitude.toFixed(6),
          currentLong: position.coords.longitude.toFixed(6),
        }));
      },
      (error) => {
        alert("Error fetching location: " + error.message);
        setAutoLocate(false); // revert checkbox
      }
    );
  };

  useEffect(() => {
    if (autoLocate) {
      getCurrentLocation();
    } else {
      // Allow manual input if auto-locate is off
      setFormData((prev) => ({
        ...prev,
        currentLat: "",
        currentLong: "",
      }));
    }
  }, [autoLocate]);

  // ----------------- Destination Suggestions -----------------
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (formData.destination.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${formData.destination}`
        );
        const data = await res.json();
        setSuggestions(data.slice(0, 5));
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(debounce);
  }, [formData.destination]);

  const selectDestination = (place) => {
    setFormData((prev) => ({
      ...prev,
      destination: place.display_name,
      destLat: place.lat,
      destLong: place.lon,
    }));
    setSuggestions([]);
  };

  // ----------------- Change Handler -----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (data) => {
    await axios.post(SERVER_URL + "/route/add", data);
  };

  // ----------------- Submit -----------------
  const calculateSafetyScore = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${PYTHON_APP_URL}/predict`, {
        lat1: formData.currentLat,
        lon1: formData.currentLong,
        lat2: formData.destLat,
        lon2: formData.destLong,
        light_intensity: formData.lightIntensity,
        traffic_density: formData.trafficDensity,
        crowd_density: formData.crowdDensity,
        crime_rate: formData.crimeRate,
        accident_rate: formData.accidentRate,
      });

      setSafetyScore(res.data.safety_score);
      await handleSubmit({
        ...formData,
        safetyScore: res.data.safety_score,
      });
    } catch (err) {
      console.error("Prediction error:", err);
      alert("Failed to calculate safety score. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------- UI -----------------
  return (
    <div className="min-w-[22rem] mx-auto p-6 bg-white rounded-xl shadow-xl mt-6 border-2 border-purple-500">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-700">
        🚦 Route Safety Estimator
      </h2>

      <form onSubmit={calculateSafetyScore} className="space-y-5">
        {/* Current Location */}
        <div>
          <label className="block font-semibold mb-1">Source Location</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="currentLat"
              value={formData.currentLat}
              onChange={handleChange}
              placeholder="Latitude"
              className="p-2 border rounded w-full"
              disabled={autoLocate}
            />
            <input
              type="text"
              name="currentLong"
              value={formData.currentLong}
              onChange={handleChange}
              placeholder="Longitude"
              className="p-2 border rounded w-full"
              disabled={autoLocate}
            />
          </div>
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="auto-locate"
              checked={autoLocate}
              onChange={() => setAutoLocate((prev) => !prev)}
              className="mr-2"
            />
            <label htmlFor="auto-locate" className="text-sm text-gray-700">
              Detect my location
            </label>
          </div>
        </div>

        {/* Destination Search */}
        <div className="relative">
          <label className="block font-semibold mb-1">Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Search for destination..."
            className="p-2 border rounded w-full"
            required
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white w-full border mt-1 rounded shadow max-h-40 overflow-y-auto">
              {suggestions.map((place, idx) => (
                <li
                  key={idx}
                  onClick={() => selectDestination(place)}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input
              type="text"
              name="destLat"
              value={formData.destLat}
              readOnly
              placeholder="Latitude"
              className="p-2 border rounded w-full bg-gray-100"
            />
            <input
              type="text"
              name="destLong"
              value={formData.destLong}
              readOnly
              placeholder="Longitude"
              className="p-2 border rounded w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Safety Parameters */}
        {[
          { label: "Light Intensity", name: "lightIntensity" },
          { label: "Traffic Density", name: "trafficDensity" },
          { label: "Crowd Density", name: "crowdDensity" },
          { label: "Crime Rate", name: "crimeRate" },
          { label: "Accident Rate", name: "accidentRate" },
        ].map((param) => (
          <div key={param.name}>
            <label className="block font-semibold mb-1">
              {param.label} (1-100)
            </label>
            <input
              type="number"
              name={param.name}
              value={formData[param.name]}
              onChange={handleChange}
              min="1"
              max="100"
              className="p-2 border rounded w-full"
              required
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-purple-600 text-white py-2 rounded-lg font-bold transition-all duration-200 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
        >
          {isLoading ? "Calculating..." : "Calculate Safety Score"}
        </button>

        {/* Result */}
        {safetyScore !== null && (
          <div className="text-center mt-4 text-xl font-bold text-green-600">
            ✅ Safety Score: {Math.round(safetyScore)}%
          </div>
        )}
      </form>
    </div>
  );
};

export default RouteScorerForm;
