const axios = require("axios");

const fetchRoutes = async (start, end, mode) => {
  let medium = "";
  switch (mode) {
    case "car":
      medium = "driving-car";
      break;
    case "bike":
      medium = "cycling-regular";
      break;
    case "foot":
      medium = "foot-walking";
      break;
    default:
      medium = "driving-car";
  }

  const url = `https://api.openrouteservice.org/v2/directions/${medium}`;

  const body = {
    coordinates: [
      [start[1], start[0]], // [lng, lat]
      [end[1], end[0]],
    ],
    alternative_routes: {
      target_count: 2,
      weight_factor: 1.4,
      share_factor: 0.6,
    },
    radiuses: 3000,
  };
  

  try {
    const response = await axios.post(url, body, {
      headers: {
        Accept:
          "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        Authorization: process.env.ORS_API_KEY,
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error in fetchRoutes:",
      error.response?.data || error.message
    );
    return null;
  }
};

module.exports = fetchRoutes;
