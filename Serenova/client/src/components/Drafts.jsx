import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../utils/config";
import { Bookmark } from "lucide-react";

const Drafts = () => {
  // const SERVER_URL = import.meta.env.SERVER_URL;
  const [draftPosts, setDraftPosts] = useState([]);
  const getDrafts = async () => {
    try {
      const res = await axios.get(SERVER_URL + "/user/stories/drafts", {
        withCredentials: true,
      });
      setDraftPosts(res.data.drafts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDrafts();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center p-3 gap-[1rem]">
        <h1 className="text-4xl font-bold my-2">Draft Posts</h1>
        <div className="flex flex-col gap-[2rem] items-center justify-center">
          {draftPosts.map((i) => {
            return (
              <>
                <div key={i._id}>
                  <Link to={`/user/draft/${i._id}`}>
                    <div className="flex flex-col gap-5 items-start p-3 bg-purple-600 rounded-xl shadow-lg shadow-purple-400">
                      <div className="flex gap-2">
                        <h1 className="text-xl font-bold text-white">
                          {i.title}
                        </h1>
                        <button>
                          <Bookmark color="white" fill="white" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Drafts;
