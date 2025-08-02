import { Link } from "react-router-dom";
import { SERVER_URL } from "../utils/config";
import axios from "axios";
import { setstories } from "../utils/storiesSlice";
import { useDispatch } from "react-redux";

const PostsNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const fetchStories = async (type) => {
    const endpoints = {
      trending: "/stories/trending",
      mostliked: "/stories/mostliked",
      mostviewed: "/stories/mostviewed",
      recent: "/stories/recent",
    };

    try {
      const res = await axios.get(SERVER_URL + endpoints[type]);
      const dataMap = {
        trending: res.data.trendingStories,
        mostliked: res.data.mostLikedStories,
        mostviewed: res.data.mostViewedStories,
        recent: res.data.recentStories,
      };
      dispatch(setstories(dataMap[type]));
    } catch (err) {
      console.error("Failed to fetch stories:", err);
    }
  };

  return (
    <div className="flex flex-col w-[70%] p-4 gap-4 justify-center text-center">
      <button
        onClick={() => fetchStories("trending")}
        className="w-full bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700"
      >
        Trending
      </button>
      <button
        onClick={() => fetchStories("mostliked")}
        className="w-full bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700"
      >
        Most Liked
      </button>
      <button
        onClick={() => fetchStories("mostviewed")}
        className="w-full bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700"
      >
        Most Viewed
      </button>
      <button
        onClick={() => fetchStories("recent")}
        className="w-full bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700"
      >
        Recent Posts
      </button>

      {user && (
        <Link
          to={`/${user._id}/saved`}
          className="w-full bg-blue-600 text-white font-semibold p-2 rounded-lg text-center hover:bg-blue-700"
        >
          Saved Posts
        </Link>
      )}
    </div>
  );
};

export default PostsNavbar;
