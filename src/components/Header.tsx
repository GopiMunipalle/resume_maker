import { images } from "../assets/images";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { headerPage } from "../constants/commontext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 shadow-lg h-16 w-full px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img
          className="h-12 sm:h-16 w-auto rounded"
          src={images.resumeLogo}
          alt="logo"
        />
        <span className="text-white font-bold text-xl sm:text-2xl">Resume Builder</span>
      </div>

      <nav>
        <ul className="flex items-center space-x-6 text-white font-semibold text-lg">
          <li>
            <a
              href="/home"
              className="hover:text-indigo-300 transition-colors duration-300"
            >
              {headerPage.home}
            </a>
          </li>
          <li>
            <a
              href="/templates"
              className="hover:text-indigo-300 transition-colors duration-300"
            >
              {headerPage.templates}
            </a>
          </li>
          <li>
            <a
              href="/profile"
              className="hover:text-indigo-300 transition-colors duration-300"
            >
              {headerPage.profile}
            </a>
          </li>
          <li>
            <a
              href="/help"
              className="hover:text-indigo-300 transition-colors duration-300"
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
