const Route = require("../models/route.model");
const fetchRoutes = require("../utils/shortestPathFinder");
const axios = require("axios");
const polyline = require("@mapbox/polyline");

const saveRoute = async (req, res) => {
  try {
    const {
      userId,
      currentLocation,
      destinationLocation,
      currentLocationName,
      destinationLocationName,
    } = req.body;
    const existing = await Route.findOne({
      userId,
      currentLocation,
      destinationLocation,
    });
    if (existing) {
      return res.status(400).json({
        message: "Route already exists",
      });
    }
    if (currentLocation.length !== 2 || destinationLocation.length !== 2) {
      return res.status(400).json({
        message: "Invalid coordinates",
      });
    }
    const newRoute = new Route({
      userId: userId,
      currentLocation: currentLocation,
      currentLocationName: currentLocationName,
      destinationLocation: destinationLocation,
      destinationLocationName: destinationLocationName,
    });

    await newRoute.save();
    res.status(200).json({
      message: "Route saved successfully",
      route: newRoute,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error saving route",
      error: err,
    });
  }
};

const deleteRoute = async (req, res) => {
  try {
    const routeId = req.params.routeId;
    const route = await Route.findByIdAndDelete(routeId);
    if (!route) {
      return res.status(404).json({
        message: "Route not found",
      });
    }

    res.status(200).json({
      message: "Route deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting route",
      error: err,
    });
  }
};

const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find({
      userId: req.user._id,
    });

    return res.status(200).json({
      message: "Routes retrieved successfully",
      routes: routes,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching routes",
      error: err,
    });
  }
};

const getSafeRoutes = async (req, res) => {
  const { source, destination, mode } = req.body;

  try {
    if (!source || !destination || !mode) {
      return res.status(400).json({
        error: "Source, destination, and mode are required",
      });
    }

    const routeData = await fetchRoutes(source, destination, mode);

    const routes = routeData.routes;

    if (!routes || !Array.isArray(routes)) {
      return res.status(500).json({
        error: "No valid routes received from ORS",
      });
    }

    const safeRoutes = await Promise.all(
      routes.slice(0, 3).map(async (route) => {
        try {
          // Decode the encoded geometry string to get coordinates
          const coords = polyline.decode(route.geometry);

          if (!coords || coords.length < 2) {
            throw new Error("Invalid decoded coordinates");
          }

          const [lat1, lon1] = coords[0];
          const [lat2, lon2] = coords[coords.length - 1];

          // ML safety score prediction
          const mlRes = await axios.post("https://serenova-flask-api.onrender.com/predict", {
            lat1,
            lon1,
            lat2,
            lon2,
            use_full_model: false,
          });

          const safetyScore = mlRes.data?.safety_score ?? null;

          return {
            route,
            safetyScore,
          };
        } catch (mlErr) {
          console.error("ML Error for route:", mlErr.message);
          return {
            route,
            safetyScore: null,
          };
        }
      })
    );

    return res.status(200).json({
      success: true,
      routes: safeRoutes,
    });
  } catch (err) {
    console.error("Error in getSafeRoutes:", err.message);
    return res.status(500).json({
      message: "Error fetching safe routes",
      error: err,
    });
  }
};

module.exports = {
  saveRoute,
  deleteRoute,
  getRoutes,
  getSafeRoutes,
};
