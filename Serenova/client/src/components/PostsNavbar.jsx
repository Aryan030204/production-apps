import { Link } from "react-router";
import { SERVER_URL } from "../utils/config";
import axios from "axios";
import { setstories } from "../utils/storiesSlice";
import { useDispatch } from "react-redux";

const PostsNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const getTrendingStories = async () => {
    try {
      const res = await axios.get(SERVER_URL + `/stories/trending`);
      dispatch(setstories(res.data.trendingStories));
    } catch (err) {
      console.log(err);
    }
  };

  const getMostLikedStories = async () => {
    try {
      const res = await axios.get(SERVER_URL + `/stories/mostliked`);
      dispatch(setstories(res.data.mostLikedStories));
    } catch (err) {
      console.log(err);
    }
  };

  const getMostViewedStories = async () => {
    try {
      const res = await axios.get(SERVER_URL + `/stories/mostviewed`);
      dispatch(setstories(res.data.mostViewedStories));
    } catch (err) {
      console.log(err);
    }
  };

  const getRecentStories = async () => {
    try {
      const res = await axios.get(SERVER_URL + `/stories/recent`);
      dispatch(setstories(res.data.recentStories));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col lg:w-[70%] p-4 gap-[1rem] justify-center text-center">
      <Link onClick={() => getTrendingStories()}>
        <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer lg:text-xl text-sm">
          <h1>Trending</h1>
        </div>
      </Link>
      <Link onClick={() => getMostLikedStories()}>
        <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer lg:text-xl text-sm">
          <h1>Most liked</h1>
        </div>
      </Link>
      <Link onClick={() => getMostViewedStories()}>
        <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer lg:text-xl text-sm">
          <h1>Most viewed</h1>
        </div>
      </Link>
      <Link onClick={() => getRecentStories()}>
        <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer lg:text-xl text-sm">
          <h1>Recent posts</h1>
        </div>
      </Link>
      {user && (
        <Link to={`${user._id}/saved`}>
          <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer lg:text-xl text-sm">
            <h1>Saved posts</h1>
          </div>
        </Link>
      )}
    </div>
  );
};

export default PostsNavbar;
