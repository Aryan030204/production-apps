import { Link } from "react-router";
import RouteDetails from "../components/RouteDetails";
import SafeRoute from "../components/SafeRoute";

const RoutePlanner = () => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-center w-full p-2 gap-[5rem]">
      <RouteDetails />
      <SafeRoute />
      <h1>
        want to know how we calculate safety scores ?{" "}
        <Link to={"/routecalculation"} className="text-blue-500 underline">
          Know more
        </Link>{" "}
        <br />
        <p className="text-center">Try <Link to={"/routescorer"} className="text-blue-500 underline">Manual Safety score calculator</Link> </p>
      </h1>
    </div>
  );
};

export default RoutePlanner;
