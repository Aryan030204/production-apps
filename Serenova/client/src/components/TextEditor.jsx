import { Button, Snackbar, TextField, Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { SERVER_URL } from "../utils/config";

const TextEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const postData = async (endpoint, data) => {
    return await axios.post(SERVER_URL + endpoint, data, {
      withCredentials: true,
    });
  };
  // const SERVER_URL = import.meta.env.SERVER_URL;
  const showSnackbar = (message, severity = "success") => {
    setSnack({ open: true, message, severity });
  };

  const handlePost = async () => {
    setLoading(true);
    try {
      await postData("/user/stories/create", { title, content });
      showSnackbar("Post published successfully!");
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to publish post.", "error");
    }
    setLoading(false);
  };

  const handleDraft = async () => {
    setLoading(true);
    try {
      await postData("/user/stories/savedraft", { title, content });
      showSnackbar("Draft saved!");
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to save draft.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-start h-full bg-red-100 p-5">
      <div className="flex flex-col my-2 items-center gap-2 w-full h-full">
        <TextField
          id="title"
          label="Title of the post"
          variant="outlined"
          className="w-full bg-white rounded-xl border-red-500 shadow-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          className="w-full border-2 border-red-500 p-2 h-full rounded-xl resize-none bg-white"
          placeholder="Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-end gap-5">
        <Button
          variant="outlined"
          disabled={!title || !content || loading}
          className="hover:bg-blue-600 hover:text-white shadow-lg"
          onClick={handleDraft}
        >
          {loading ? "Saving..." : "SAVE DRAFT"}
        </Button>
        <Button
          variant="contained"
          disabled={!title || !content || loading}
          className="shadow-lg"
          onClick={handlePost}
        >
          {loading ? "Posting..." : "POST"}
        </Button>
      </div>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack({ ...snack, open: false })}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TextEditor;
