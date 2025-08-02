/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PostsNavbar from "../components/PostsNavbar";
import UserActivityNavbar from "../components/UserActivityNavbar";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const DraftPost = () => {
  const [draft, setDraft] = useState({ title: "", content: "" });
  const { id } = useParams();

  const handlePost = async () => {
    try {
      await axios.post(
        SERVER_URL + "/user/stories/create",
        {
          title: draft.title,
          content: draft.content,
        },
        { withCredentials: true }
      );
      alert("Post created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error while creating post");
    }
  };

  const handleDraft = async () => {
    try {
      await axios.post(
        SERVER_URL + "/user/stories/drafts/save",
        {
          title: draft.title,
          content: draft.content,
        },
        { withCredentials: true }
      );
      alert("Draft saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error while saving draft");
    }
  };

  const getDraft = async () => {
    try {
      const res = await axios.get(SERVER_URL + `/user/stories/drafts/${id}`, {
        withCredentials: true,
      });
      setDraft(res.data.draft);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDraft();
  }, []);

  return (
    <div className="flex p-5 items-start justify-between w-full h-full">
      <div className="flex flex-col gap-2 w-[75%] bg-red-100 p-5 rounded-xl shadow-md h-full">
        <TextField
          label="Title of the post"
          variant="outlined"
          className="w-full bg-white rounded-xl"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />

        <textarea
          className="w-full border-2 border-red-500 p-2 h-full rounded-xl mt-4 bg-white shadow-inner resize-none"
          placeholder="Content..."
          value={draft.content}
          onChange={(e) => setDraft({ ...draft, content: e.target.value })}
        />

        <div className="flex justify-end gap-5 mt-4">
          <Button
            variant="outlined"
            className="hover:bg-blue-600 hover:text-white shadow-lg"
            onClick={handleDraft}
          >
            SAVE DRAFT
          </Button>
          <Button
            variant="contained"
            className="shadow-lg"
            onClick={handlePost}
          >
            POST
          </Button>
        </div>
      </div>

      <div className="flex w-[20%] flex-col bg-purple-900 rounded-2xl gap-[5rem] h-[40rem] items-center justify-evenly shadow-purple-500 shadow-xl">
        <PostsNavbar />
        <UserActivityNavbar />
      </div>
    </div>
  );
};

export default DraftPost;
