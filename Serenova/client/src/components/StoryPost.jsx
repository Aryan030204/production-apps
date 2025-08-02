/* eslint-disable react-hooks/exhaustive-deps */
import { Bookmark, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setstories } from "../utils/storiesSlice";
import Pagination from "./Pagination";

const StoryPost = () => {
  const stories = useSelector((state) => state.stories.stories);
  const [savedStories, setSavedStories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(true);

  const updateUser = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/profile`, {
        withCredentials: true,
      });
      setUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const likeStory = async (id) => {
    if (!user) return toast.error("Login required");
    try {
      await axios.patch(
        `${SERVER_URL}/stories/${id}/like/increment`,
        {},
        { withCredentials: true }
      );
      updateUser();
      getStories();
    } catch (err) {
      console.log(err);
    }
  };

  const dislikeStory = async (id) => {
    if (!user) return toast.error("Login required");
    try {
      await axios.patch(
        `${SERVER_URL}/stories/${id}/like/decrement`,
        {},
        { withCredentials: true }
      );
      updateUser();
      getStories();
    } catch (err) {
      console.log(err);
    }
  };

  const saveStory = async (id) => {
    try {
      if (savedStories.includes(id)) {
        await axios.post(
          `${SERVER_URL}/user/stories/${id}/unsave`,
          {},
          { withCredentials: true }
        );
        setSavedStories((prev) => prev.filter((postId) => postId !== id));
        toast.success("Post unsaved");
      } else {
        await axios.post(
          `${SERVER_URL}/user/stories/${id}/save`,
          {},
          { withCredentials: true }
        );
        setSavedStories((prev) => [...prev, id]);
        toast.success("Post saved");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const viewStory = async (id) => {
    try {
      await axios.patch(
        `${SERVER_URL}/stories/${id}/viewed`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getSavedStories = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/user/stories/saved`, {
        withCredentials: true,
      });
      setSavedStories(res.data.savedPosts.map((post) => post._id));
    } catch (err) {
      console.error("Error fetching saved posts:", err);
    }
  };

  const getStories = async (page = 1) => {
    try {
      const res = await axios.get(
        `${SERVER_URL}/stories/all?page=${page}&limit=5`
      );
      dispatch(setstories(res.data.stories));
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching stories:", err);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([getStories(), getSavedStories(), updateUser()]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading)
    return <div className="text-center w-full p-10">Loading stories...</div>;

  if (!stories || stories.length === 0)
    return <div className="text-center w-full p-10">No stories found.</div>;

  return (
    <div className="flex flex-col justify-evenly w-full h-fit p-2 gap-6">
      {stories.map((i) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const dateParts = i.createdAt.split("T")[0].split("-");
        const timePart = i.createdAt.split("T")[1].split(".")[0];
        const formattedDate = `${dateParts[2]}th ${
          months[+dateParts[1] - 1]
        }, ${dateParts[0]} ${timePart}`;

        const isLiked = user?.likedPosts?.includes(i._id);
        const isDisliked = user?.dislikedPosts?.includes(i._id);

        return (
          <div
            key={i._id}
            className="flex flex-col gap-2 p-4 bg-gray-800 rounded-3xl shadow-xl shadow-purple-500 text-white"
          >
            <Link
              to={`stories/${i._id}`}
              onClick={() => viewStory(i._id)}
              className="w-full"
            >
              <h1 className="text-yellow-400 text-xl md:text-2xl font-bold">
                {i.title}
              </h1>
              <div className="flex gap-2 text-sm opacity-70 mt-1">
                <p>Posted: {formattedDate}</p>
                <span>•</span>
                <p>{i.author}</p>
              </div>
              <hr className="my-3 border-white/30" />
              <p className="whitespace-pre-line text-base md:text-lg">
                {i.content}
              </p>
            </Link>

            <div className="flex flex-wrap justify-between items-center mt-3 gap-3">
              <div className="flex gap-3 text-lg items-center">
                <button onClick={() => likeStory(i._id)}>
                  {isLiked ? <ThumbsUp fill="blue" /> : <ThumbsUp />}
                </button>
                <span>{i.likes || 0}</span>

                <button onClick={() => dislikeStory(i._id)}>
                  {isDisliked ? <ThumbsDown fill="red" /> : <ThumbsDown />}
                </button>
                <span>{i.dislikes || 0}</span>

                <button onClick={() => saveStory(i._id)}>
                  {savedStories.includes(i._id) ? (
                    <Bookmark fill="white" />
                  ) : (
                    <Bookmark />
                  )}
                </button>

                <button>
                  <Share2 />
                </button>
              </div>
              <span className="text-sm opacity-50">{i.views} views</span>
            </div>
          </div>
        );
      })}
      <ToastContainer />
      <div className="w-full flex justify-center">
        <Pagination
          page={page}
          totalPages={totalPages}
          fetchStories={getStories}
        />
      </div>
    </div>
  );
};

export default StoryPost;
