/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPost = () => {
  const [post, setPost] = useState({ title: "", content: "" });
  const { id } = useParams();

  const getPost = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/user/stories/drafts/${id}`, {
        withCredentials: true,
      });
      setPost(res.data.draft);
    } catch (err) {
      console.error("Failed to fetch draft:", err);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(
        SERVER_URL + `/stories/${id}`,
        {
          title: post.title,
          content: post.content,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Post updated successfully!");
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center justify-start h-full bg-red-100 p-5">
      <div className="flex flex-col my-2 items-center gap-2 w-full h-full">
        <TextField
          id="outlined-basic"
          label="Title of the post"
          variant="outlined"
          className="w-full bg-white rounded-xl border-red-500 shadow-lg"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <textarea
          className="w-full border-2 border-red-500 p-2 h-64 rounded-xl resize-none"
          placeholder="Content..."
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />
      </div>
      <div className="flex w-full justify-end gap-5">
        <Button variant="contained" className="shadow-lg" onClick={handleEdit}>
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default EditPost;
