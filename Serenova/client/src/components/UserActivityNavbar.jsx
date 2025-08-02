import { Link } from "react-router";

const UserActivityNavbar = () => {
  const navItems = [
    { label: "Create", path: "/posts/new" },
    { label: "My posts", path: "/user/posts" },
    { label: "Drafts", path: "/user/drafts" },
  ];

  return (
    <div className="flex flex-col lg:w-[70%] p-4 gap-4 justify-center text-center">
      {navItems.map((item, index) => (
        <Link key={index} to={item.path}>
          <div className="flex w-full items-center justify-center bg-red-600 text-white font-semibold p-2 rounded-lg cursor-pointer hover:bg-red-700 transition lg:text-xl text-sm">
            <h1>{item.label}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserActivityNavbar;
