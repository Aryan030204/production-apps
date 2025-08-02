/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../utils/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  
  const getMyPosts = async () => {
    try {
      const res = await axios.get(SERVER_URL + `/${user._id}/stories`, {
        withCredentials: true,
      });
      setMyPosts(res.data.stories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(SERVER_URL + `/stories/${id}`, {
        withCredentials: true,
      });
      toast.success("Post deleted successfully");
      getMyPosts();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMyPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col justify-center items-center p-3 gap-[1rem]">
        <h1 className="text-4xl font-bold my-2">My Posts</h1>
        <div className="flex flex-col gap-[2rem] items-center justify-center">
          {myPosts.map((i) => {
            return (
              <>
                <Link>
                  <div className="flex flex-col gap-5 items-start p-3 bg-purple-600 rounded-xl shadow-lg shadow-purple-400">
                    <div className="flex gap-2">
                      <h1 className="text-xl font-bold text-white">
                        {i.title}
                      </h1>
                      <div className="flex h-full items-center ml-4 gap-2">
                        <Link to={`/stories/${i._id}/edit`}>
                          <button className="bg-white p-2 rounded-lg font-bold hover:bg-gray-200">
                            <Pencil color="green" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(i._id)}
                          className="bg-white p-2 rounded-lg hover:bg-gray-200"
                        >
                          <Trash2 color="red" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default MyPosts;
