import PostsNavbar from "../components/PostsNavbar";
import StoryPost from "../components/StoryPost";
import UserActivityNavbar from "../components/UserActivityNavbar";

const Stories = () => {
  const user = localStorage.getItem("user");

  return (
    <div className="flex flex-col w-full justify-center items-center p-2 bg-purple-200">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-red-500 relative lg:left-0 md:left-[14rem] text-center md:text-left">
          Stories:{" "}
          <span className="text-base md:text-xl lg:text-3xl font-mono text-black">
            A place for engaging content
          </span>
        </h1>
        <p className="text-sm md:hidden lg:block lg:text-xl font-serif text-purple-600 underline text-center">
          Empowering Women, One Story at a Time
        </p>
      </div>

      <div className="flex flex-col lg:flex-row p-1 w-full gap-4 items-center lg:items-start justify-center">
        {/* posts section */}
        <div className="w-full lg:w-[80%] flex flex-col gap-2 rounded-lg pb-5 pl-2">
          <StoryPost />
        </div>

        {/* navigation section */}
        <div className="w-full lg:w-[20%] flex flex-col bg-purple-900 rounded-2xl gap-8 lg:gap-[5rem] h-auto lg:h-[40rem] items-center justify-evenly shadow-purple-500 shadow-xl p-4">
          <PostsNavbar />
          {user && <UserActivityNavbar />}
        </div>
      </div>
    </div>
  );
};

export default Stories;
