import UserActivityNavbar from "../components/UserActivityNavbar";
import TextEditor from "./TextEditor";

const CreatePost = () => {
  return (
    <div className="flex w-full justify-between p-4">
      <div className="w-[75%]">
        <TextEditor />
      </div>
      <div className="flex w-[20%] flex-col bg-purple-900 rounded-2xl gap-[5rem] h-[40rem] items-center justify-start shadow-purple-500 shadow-xl">
        <UserActivityNavbar />
      </div>
      <div id="editor"></div>
    </div>
  );
};

export default CreatePost;
