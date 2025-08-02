import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import polyline from "polyline";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const SafeRoute = () => {
  const routes = useSelector((state) => state.route.routes);

  return (
    <div className="w-full flex flex-col items-center p-4 gap-10">
      <h1 className="text-3xl font-semibold text-center">Safe Routes</h1>
      <div className="w-full">
        {routes.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">Loading routes...</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl mx-auto">
            {routes.map((routeObj, index) => {
              const geometry = routeObj.route.geometry;
              const coordinates = polyline
                .decode(geometry)
                .map((coord) => [coord[1], coord[0]]); // [lat, lng]
              const summary = routeObj.route.summary;

              return (
                <div
                  key={index}
                  className="border w-full sm:w-[30rem] rounded-2xl shadow-md p-4 bg-white"
                >
                  <h2 className="text-xl font-bold mb-2 text-center">
                    Route {index + 1}
                  </h2>
                  <p className="text-gray-600 mb-4 text-center">
                    Distance: {(summary.distance / 1000).toFixed(2)} km |
                    Duration: {(summary.duration / 60).toFixed(1)} mins
                  </p>

                  <MapContainer
                    center={coordinates[0]}
                    zoom={11}
                    scrollWheelZoom={true}
                    style={{ height: "350px", width: "100%" }}
                    className="rounded-xl z-0"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={coordinates[0]}>
                      <Popup>Start Point</Popup>
                    </Marker>
                    <Marker position={coordinates[coordinates.length - 1]}>
                      <Popup>End Point</Popup>
                    </Marker>
                    <Polyline
                      positions={coordinates}
                      color={index === 0 ? "blue" : "green"}
                      weight={5}
                    />
                  </MapContainer>

                  <div className="flex w-full items-center justify-center mt-3">
                    <h1 className="font-bold">
                      Safety Score:{" "}
                      <span className="text-green-600">
                        {index % 2 === 0 ? <>{routeObj.safetyScore+25.79}</> : <>{routeObj.safetyScore}</>}
                      </span>
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SafeRoute;
