import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import SOSBtn from "./SOSBtn";

const navLinks = [
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact us" },
  { path: "/help", label: "Want help?" },
  { path: "/routeplanner", label: "Route Planner" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((store) => store.user.user);

  return (
    <header className="w-full h-[5rem] bg-white px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="serenova"
          className="w-[4rem] h-[4rem] border rounded-full"
        />
      </Link>

      {/* Hamburger Icon */}
      <button
        className="lg:hidden text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Desktop Nav & Auth */}
      <div className="hidden lg:flex items-center gap-10">
        <nav className="flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.path} className="list-none">
              <Link
                to={link.path}
                className="text-lg font-bold transition-all ease-in-out duration-300 hover:text-purple-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <SOSBtn />
          {user ? (
            <Profile user={user} />
          ) : (
            <Link to="/login" className="text-lg font-semibold hover:underline">
              login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="lg:hidden absolute top-[4rem] left-0 w-full bg-white shadow-lg border-t border-gray-200 flex flex-col items-center py-4 space-y-4 z-50">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-lg font-bold"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {user ? (
            <>
              <div className="flex flex-col items-center space-y-3">
                <Profile user={user} />
                <SOSBtn />
              </div>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="text-lg font-bold"
                onClick={() => setIsOpen(false)}
              >
                login
              </Link>
            </li>
          )}
        </ul>
      )}
    </header>
  );
};

export default Header;
