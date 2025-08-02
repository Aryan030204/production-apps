/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { SERVER_URL } from "../utils/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import {
  ArrowLeft,
  Bookmark,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useSelector } from "react-redux";

const OpenedPost = () => {
  const { id } = useParams();
  const [story, setStory] = useState({});
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [savedStories, setSavedStories] = useState([]);
  const user = useSelector((state) => state.user.user);
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
  const getSavedStories = async () => {
    try {
      const res = await axios.get(SERVER_URL + `/user/stories/saved`, {
        withCredentials: true,
      });
      setSavedStories(res.data.savedPosts.map((post) => post._id));
    } catch (err) {
      console.log(err);
    }
  };
  const getStory = async () => {
    try {
      const res = await axios.get(SERVER_URL + `/stories/${id}`, {
        withCredentials: true,
      });

      setStory(res.data.story);
      getSavedStories();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStory();
  }, []);

  const likeStory = async () => {
    try {
      if (!liked) {
        await axios.patch(
          SERVER_URL + `/stories/${id}/like/increment`,
          {},
          {
            withCredentials: true,
          }
        );
        setLiked(true);
        if (disliked) {
          await axios.patch(
            SERVER_URL + `/stories/${id}/dislike/decrement`,
            {},
            {
              withCredentials: true,
            }
          );
          setDisliked(false);
        }
      } else {
        await axios.patch(
          SERVER_URL + `/stories/${id}/like/decrement`,
          {},
          {
            withCredentials: true,
          }
        );

        setLiked(false);
      }
      getStory();
    } catch (err) {
      console.log(err);
    }
  };

  const dislikeStory = async () => {
    try {
      if (!disliked) {
        await axios.patch(
          SERVER_URL + `/stories/${id}/dislike/increment`,
          {},
          {
            withCredentials: true,
          }
        );
        setDisliked(true);
        if (liked) {
          await axios.patch(
            SERVER_URL + `/stories/${id}/like/decrement`,
            {},
            {
              withCredentials: true,
            }
          );
          setLiked(false);
        }
      } else {
        await axios.patch(
          SERVER_URL + `/stories/${id}/dislike/decrement`,
          {},
          {
            withCredentials: true,
          }
        );
        setDisliked(false);
      }
      getStory();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col p-[2rem] justify-between items-start w-full gap-4">
      <div className="flex border-2 p-2 rounded-lg bg-red-500 hover:bg-red-600 shadow-xl">
        <Link to={"/blog"} className="flex items-center font-semibold text-white">
          {" "}
          <ArrowLeft size={20} /> Back
        </Link>
      </div>
      {/*post*/}
      <div className="flex flex-col w-full gap-4 my-2 bg-gray-800 text-white rounded-lg p-[1rem]">
        <div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-red-500">
              {story.title}
            </h1>
          </div>
          <div className="flex gap-1">
            <h1 className="text-sm font-normal opacity-50 mt-1">
              Posted:{" "}
              {story.createdAt
                ? `${story.createdAt.split("T")[0].split("-")[2]}th ${
                    months[
                      story.createdAt
                        .split("T")[0]
                        .split("-")[1]
                        .split("0")[1] - 1
                    ]
                  }, ${story.createdAt.split("T")[0].split("-")[0]} ${
                    story.createdAt.split("T")[1].split(".")[0]
                  },`
                : "loading..."}
            </h1>
            <h1 className="text-sm font-normal opacity-50 mt-1">
              {story.author}
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg">{story.content}</p>
          <div className="flex gap-2 w-full self-start text-2xl items-center justify-start">
            <div className="flex justify-center items-center gap-1 text-lg">
              <button
                onClick={() => {
                  if (user !== null) {
                    likeStory();
                  } else {
                    toast.error(
                      "You must be logged in to like or dislike a post",
                      {
                        className: "font-semibold",
                      }
                    );
                  }
                }}
              >
                {liked ? <ThumbsUp fill="blue" /> : <ThumbsUp />}
              </button>
              <h1>{story.likes > 0 ? story.likes : 0}</h1>
            </div>
            <div className="flex justify-center items-center gap-1 text-lg">
              <button
                onClick={() => {
                  if (user !== null) {
                    dislikeStory();
                  } else {
                    toast.error(
                      "You must be logged in to like or dislike a post",
                      {
                        className: "font-semibold",
                      }
                    );
                  }
                }}
              >
                {disliked ? <ThumbsDown fill="red" /> : <ThumbsDown />}
              </button>
              <h1>{story.dislikes > 0 ? story.dislikes : 0}</h1>
            </div>
            <div className="flex w-full items-center text-lg">
              <button>
                <Share2 />
              </button>
            </div>
            <div className="flex text-lg items-center">
              <button>
                {savedStories.includes(id) ? (
                  <h1 className="flex items-center gap-1">
                    <Bookmark fill="white" opacity={"0.7"} /> Saved
                  </h1>
                ) : (
                  <Bookmark />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OpenedPost;
