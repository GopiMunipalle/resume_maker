import { images } from "../assets/images";
import { headerPage } from "../constants/commontext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 shadow-lg h-16 w-full px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img
          className="h-12 sm:h-16 w-auto rounded"
          src={images.resumeLogo}
          alt="logo"
        />
        <span className="text-white font-bold text-xl hidden md:block">
          Resume Builder
        </span>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes className="text-white text-2xl" />
          ) : (
            <FaBars className="text-white text-2xl" />
          )}
        </button>
      </div>

      <nav className="hidden md:flex">
        <ul className="flex sm:flex-row flex-row sm:space-x-6 space-y-4 sm:space-y-0 items-center text-white font-semibold text-lg">
          <li>
            <a
              href="/home"
              className="hover:text-indigo-300 transition-colors duration-3004 text-[10px] md:text-[16px]"
            >
              {headerPage.home}
            </a>
          </li>
          <li>
            <a
              href="/templates"
              className="hover:text-indigo-300 transition-colors duration-300 text-[10px] md:text-[16px]"
            >
              {headerPage.templates}
            </a>
          </li>
          <li>
            <a
              href="/profile"
              className="hover:text-indigo-300 transition-colors duration-300 text-[10px] md:text-[16px]"
            >
              {headerPage.profile}
            </a>
          </li>
          <li>
            <a
              href="/help"
              className="hover:text-indigo-300 transition-colors duration-300 text-[10px] md:text-[16px]"
            >
              {headerPage.help}
            </a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
            >
              {headerPage.logout}
            </button>
          </li>
        </ul>
      </nav>

      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } md:hidden absolute top-16 left-0 w-full bg-indigo-700`}
      >
        <ul className="flex flex-col items-center text-white font-semibold text-lg space-y-4 py-4">
          <li>
            <a
              href="/home"
              className="hover:text-indigo-300 transition-colors duration-300 text-[16px]"
            >
              {headerPage.home}
            </a>
          </li>
          <li>
            <a
              href="/templates"
              className="hover:text-indigo-300 transition-colors duration-300 text-[16px]"
            >
              {headerPage.templates}
            </a>
          </li>
          <li>
            <a
              href="/profile"
              className="hover:text-indigo-300 transition-colors duration-300 text-[16px]"
            >
              {headerPage.profile}
            </a>
          </li>
          <li>
            <a
              href="/help"
              className="hover:text-indigo-300 transition-colors duration-300 text-[16px]"
            >
              {headerPage.help}
            </a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
            >
              {headerPage.logout}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
