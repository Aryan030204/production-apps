import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/config";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const RoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  // const SERVER_URL = import.meta.env.SERVER_URL;

  const getRoutes = async () => {
    const res = await axios.get(SERVER_URL + "/route/all", {
      withCredentials: true,
    });
    setRoutes(res.data.routes);
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(SERVER_URL + `/route/delete/${_id}`, {
        withCredentials: true,
      });
      toast.success("Route deleted");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRoutes();
  }, [routes]);
  return (
    <div className="flex flex-col md:w-1/2 items-center justify-center self-center my-10 p-5">
      <div>
        <h1 className="font-bold text-3xl">Saved Routes</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mt-8">
        {routes.map((route) => {
          return (
            <>
              <div
                key={route._id}
                className="flex lg:gap-[5rem] justify-between items-center bg-purple-100 self-start lg:w-full md:w-[45rem] p-4"
              >
                <div className="flex flex-col flex-wrap items-start w-1/2">
                  <h1 className="font-bold">Current Location: </h1>
                  <h1 className="font-bold text-red-500">
                    {route.currentLocationName}, (
                    {route.currentLocation.join(", ")})
                  </h1>
                </div>
                <div className="flex flex-col flex-wrap items-start w-1/2">
                  <h1 className="font-bold">Destination Location: </h1>
                  <h1 className="font-bold text-red-500">
                    {route.destinationLocationName}, (
                    {route.destinationLocation.join(", ")})
                  </h1>
                </div>
                <div className="flex justify-center items-center p-2 bg-blue-500 rounded-xl w-[5rem] text-white font-bold">
                  <button
                    onClick={() => {
                      handleDelete(route._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          );
        })}
        <ToastContainer/>
      </div>
    </div>
  );
};

export default RoutesPage;
