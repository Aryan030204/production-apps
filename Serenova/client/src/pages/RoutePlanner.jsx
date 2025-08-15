import { Link } from "react-router-dom";
import RouteDetails from "../components/RouteDetails";
import SafeRoute from "../components/SafeRoute";
import { FaHandshake } from "react-icons/fa";

const RoutePlanner = () => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-center w-full p-2 gap-[5rem]">
      <RouteDetails />
      <SafeRoute />
      <h1 className="text-center text-lg">
        want to know how we calculate safety scores ?{" "}
        <Link to={"/routecalculation"} className="text-blue-500 hover:underline">
          Know more
        </Link>{" "}
        <br />
        <p className="text-center flex items-center justify-center">
          {" "}
          <span className="mx-2">
            <FaHandshake size={20} />
          </span>{" "}
          Help us{" "}
          <Link to={"/routescorer"} className="text-blue-500 hover:underline mx-1">
            grow
          </Link>{" "}
        </p>
      </h1>
    </div>
  );
};

export default RoutePlanner;
