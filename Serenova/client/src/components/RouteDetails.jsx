/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setFromLat,
  setToLat,
  setFromLong,
  setToLong,
  setTransportMode,
  setRoutes,
} from "../utils/routeSlice";
import { OPENWEATHER_API_KEY, SERVER_URL } from "../utils/config";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaCar,
  FaBicycle,
  FaWalking,
  FaCrosshairs,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const RouteDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [mode, setMode] = useState("driving");
  const [source, setSource] = useState("");
  const [location, setLocation] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [sourceLoading, setSourceLoading] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [destination, setDestination] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [destinationLoading, setDestinationLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [saveBtnVisible, setSaveBtnVisible] = useState(false);

  const detectLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(4));
        const lon = Number(pos.coords.longitude.toFixed(4));
        setLocation(`${lat}, ${lon}`);
        setSourceSuggestions([]);
        try {
          const { data } = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          setSource(data?.display_name || "Current Location");
        } catch (err) {
          console.error("Failed to fetch location address:", err);
          setSource(`${lat}, ${lon}`);
        }
      },
      (err) => console.error("Geolocation error:", err)
    );
  };

  useEffect(() => {
    setUseCurrentLocation(true);
    detectLocation();
  }, []);

  const fetchSourceSuggestions = useCallback(
    (() => {
      let debounceTimer;
      return (query) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
          if (query.length > 2) {
            setSourceLoading(true);
            try {
              const { data } = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
              );
              setSourceSuggestions(data);
            } catch (err) {
              console.error("Source suggestion fetch failed:", err);
            } finally {
              setSourceLoading(false);
            }
          } else {
            setSourceSuggestions([]);
          }
        }, 300);
      };
    })(),
    []
  );

  const fetchDestinationSuggestions = useCallback(
    (() => {
      let debounceTimer;
      return (query) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
          if (query.length > 2) {
            setDestinationLoading(true);
            try {
              const { data } = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
              );
              setDestinationSuggestions(data);
            } catch (err) {
              console.error("Destination suggestion fetch failed:", err);
            } finally {
              setDestinationLoading(false);
            }
          } else {
            setDestinationSuggestions([]);
          }
        }, 300);
      };
    })(),
    []
  );

  const handleSourceSelect = (place) => {
    setSource(place.display_name);
    setLocation(`${place.lat}, ${place.lon}`);
    setSourceSuggestions([]);
  };

  const handleDestinationSelect = (place) => {
    setDestination(place.display_name);
    setCoordinates(`${place.lat}, ${place.lon}`);
    setDestinationSuggestions([]);
  };

  const handleSaveRoute = async () => {
    if (!location || !coordinates) return console.error("Missing data");
    try {
      const [lat, lon] = location.split(",").map(Number);
      const [destLat, destLon] = coordinates.split(",").map(Number);
      const [currentNameRes, destNameRes] = await Promise.all([
        axios.get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
        ),

        axios.get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${destLat}&lon=${destLon}&appid=${OPENWEATHER_API_KEY}`
        ),
      ]);
      await axios.post(
        `${SERVER_URL}/route/save`,
        {
          userId: user._id,
          currentLocation: [lat, lon],
          destinationLocation: [destLat, destLon],
          currentLocationName: currentNameRes?.data?.[0]?.name || "Unknown",
          destinationLocationName: destNameRes?.data?.[0]?.name || "Unknown",
        },
        { withCredentials: true }
      );
      setSaved(true);
      setAlreadySaved(false);
      setTimeout(() => setSaved(false), 4000);
    } catch (err) {
      setAlreadySaved(true);
      setTimeout(() => setAlreadySaved(false), 4000);
      console.error("Route save failed:", err);
    }
  };

  const handleGetRoute = async () => {
    if (!location || !coordinates) {
      alert("Please select both a source and a destination.");
      return;
    }
    const [fromLat, fromLong] = location.split(",");
    const [toLat, toLong] = coordinates.split(",");
    const sourceCoords = [parseFloat(fromLat), parseFloat(fromLong)];
    const destinationCoords = [parseFloat(toLat), parseFloat(toLong)];
    const res = await axios.post(SERVER_URL + "/route/find", {
      source: sourceCoords,
      destination: destinationCoords,
      mode: mode,
    });
    dispatch(setRoutes(res.data.routes));
    dispatch(setFromLat(fromLat));
    dispatch(setFromLong(fromLong));
    dispatch(setToLat(toLat));
    dispatch(setToLong(toLong));
    dispatch(setTransportMode(mode));
    localStorage.setItem("routes", JSON.stringify(res.data.routes));
    setTimeout(() => setSaveBtnVisible(true), 2000);
  };

  return (
    <div className="bg-yellow-300 p-8 rounded-2xl shadow-2xl w-full max-w-md my-12 font-sans">
      <h1 className="text-3xl font-bold text-center text-red-500 mb-2">
        Safe Route Planner
      </h1>
      <p className="text-center text-black mb-8">
        Enter your start and end points to find the safest route.
      </p>

      <div className="space-y-6">
        {/* Source Location Input */}
        <div className="relative">
          <label className="font-semibold text-gray-700 mb-2 block">
            Starting Location
          </label>
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a starting place..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                if (useCurrentLocation) setUseCurrentLocation(false);
                fetchSourceSuggestions(e.target.value);
              }}
            />
          </div>
          {sourceLoading && (
            <p className="text-sm text-gray-500 mt-2">Searching...</p>
          )}
          {sourceSuggestions.length > 0 && (
            <SuggestionList
              suggestions={sourceSuggestions}
              onSelect={handleSourceSelect}
            />
          )}
          <div className="mt-3">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer w-fit">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={useCurrentLocation}
                onChange={(e) => {
                  setUseCurrentLocation(e.target.checked);
                  if (e.target.checked) detectLocation();
                  else {
                    setSource("");
                    setLocation("");
                  }
                }}
              />
              <FaCrosshairs className="text-indigo-600" /> Use my current
              location
            </label>
          </div>
        </div>

        {/* Destination Input */}
        <div className="relative">
          <label className="font-semibold text-gray-700 mb-2 block">
            Destination
          </label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a destination..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                fetchDestinationSuggestions(e.target.value);
              }}
            />
          </div>
          {destinationLoading && (
            <p className="text-sm text-gray-500 mt-2">Searching...</p>
          )}
          {destinationSuggestions.length > 0 && (
            <SuggestionList
              suggestions={destinationSuggestions}
              onSelect={handleDestinationSelect}
            />
          )}
        </div>

        {/* Mode of Transport */}
        <div>
          <label className="font-semibold text-gray-700 mb-3 block">
            Mode of Transport
          </label>
          <div className="grid grid-cols-3 gap-3">
            <TransportModeButton
              icon={<FaCar />}
              label="Car"
              value="car"
              mode={mode}
              setMode={setMode}
            />
            <TransportModeButton
              icon={<FaBicycle />}
              label="Cycling"
              value="bike"
              mode={mode}
              setMode={setMode}
            />
            <TransportModeButton
              icon={<FaWalking />}
              label="Foot"
              value="foot"
              mode={mode}
              setMode={setMode}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons & Feedback */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          className="w-full py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md hover:shadow-lg"
          onClick={handleGetRoute}
        >
          GET ROUTES
        </button>

        {saveBtnVisible && (
          <button
            className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            onClick={handleSaveRoute}
          >
            Save This Route
          </button>
        )}

        <div className="h-6 mt-2 text-center">
          {saved && (
            <FeedbackMessage
              icon={<FaCheckCircle />}
              text="Route saved successfully!"
              type="success"
            />
          )}
          {alreadySaved && (
            <FeedbackMessage
              icon={<FaExclamationCircle />}
              text="Route already saved!"
              type="error"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const SuggestionList = ({ suggestions, onSelect }) => (
  <ul className="absolute w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10 mt-1">
    {suggestions.map((place, index) => (
      <li
        key={place.place_id || index}
        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-indigo-50"
        onClick={() => onSelect(place)}
      >
        <FaMapMarkerAlt className="text-gray-400" />
        <span className="text-sm text-gray-700">{place.display_name}</span>
      </li>
    ))}
  </ul>
);

const TransportModeButton = ({ icon, label, value, mode, setMode }) => (
  <label
    className={`flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
      mode === value
        ? "bg-indigo-500 text-white shadow-md"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`}
  >
    <input
      type="radio"
      name="transport"
      value={value}
      className="sr-only"
      onChange={(e) => setMode(e.target.value)}
      checked={mode === value}
    />
    <div className="text-2xl mb-1">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </label>
);

const FeedbackMessage = ({ icon, text, type }) => (
  <div
    className={`flex items-center justify-center gap-2 font-semibold ${
      type === "success" ? "text-green-600" : "text-red-600"
    }`}
  >
    {icon}
    <span>{text}</span>
  </div>
);

export default RouteDetails;
