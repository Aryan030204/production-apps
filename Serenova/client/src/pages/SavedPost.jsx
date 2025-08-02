import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import PostsNavbar from "../components/PostsNavbar";
import UserActivityNavbar from "../components/UserActivityNavbar";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../utils/config";
import axios from "axios";

const SavedPost = () => {
  const [story, setStory] = useState({});
  const { id } = useParams();
  
  const getStory = async () => {
    try {
      const res = await axios.get(SERVER_URL + `/stories/${id}`, {
        withCredentials: true,
      });
      setStory(res.data.story);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getStory();
  });
  return (
    <>
      <div className="flex justify-between p-4 items-start">
        <div className="flex flex-col bg-gray-800 w-[70%] p-4 rounded-xl">
          <div className="w-full">
            <h1 className="text-yellow-500 font-bold text-3xl">
              {story.title}
            </h1>
          </div>
          <div className="w-full my-2">
            <p className="text-white">{story.content}</p>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-fit flex gap-1 items-center text-white text-lg">
              <ThumbsUp color="white" />
              <p>{story.likes}</p>
            </div>
            <div className="w-fit flex gap-1 items-center text-white text-lg">
              <ThumbsDown color="white" />
              <p>{story.dislikes}</p>
            </div>
          </div>
        </div>
        <div className="w-[20%]">
          <div className="flex flex-col bg-purple-900 rounded-2xl gap-[5rem] h-[40rem] items-center justify-evenly shadow-purple-500 shadow-xl">
            <PostsNavbar />
            <UserActivityNavbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedPost;
