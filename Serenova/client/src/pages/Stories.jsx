import PostsNavbar from "../components/PostsNavbar";
import StoryPost from "../components/StoryPost";
import UserActivityNavbar from "../components/UserActivityNavbar";

const Stories = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    return (
      <div className="flex flex-col w-full justify-center items-center p-2 bg-purple-200">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-red-500 relative md:left-[14rem] lg:left-0">
            Stories:{" "}
            <span className="text-black font-bold text-base md:text-xl lg:text-3xl">
              A place for engaging content
            </span>
          </h1>
          <p className="text-sm md:text-lg lg:text-xl font-bold text-purple-800 hidden md:block">
            Empowering Women, One Story at a Time
          </p>
        </div>

        <div className="flex flex-col lg:flex-row w-full p-1 gap-4">
          <div className="w-full lg:w-[20%] flex flex-col bg-purple-900 rounded-2xl gap-10 h-auto lg:h-[40rem] items-center justify-evenly shadow-purple-500 shadow-xl p-4">
            <PostsNavbar />
            {user && <UserActivityNavbar />}
          </div>
          <div className="w-full lg:w-[80%] flex flex-col gap-2 rounded-lg pb-5 pl-2">
            <StoryPost />
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error("Component render crash:", err);
    return (
      <div>
        Something broke in rendering. Check console. <br /> {err.message}
      </div>
    );
  }
};

export default Stories;
