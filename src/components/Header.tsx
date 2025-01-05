import { images } from "../assets/images";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { headerPage } from "../constants/commontext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hadleLogout = () => {
    console.log("clicked");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center bg-slate-600 h-16 w-auto shadow">
      <img
        className="h-full w-25 sm:w-20 sm:mr-5"
        src={images.resumeLogo}
        alt="logo"
      />
      <div>
        <ul className="gap-3 pr-3 sm:gap-4 md:gap-5 flex justify-center text-white">
          <li>
            <a href="/home">{headerPage.home}</a>
          </li>
          <li>
            <a href="/templates">{headerPage.templates}</a>
          </li>
          <li>
            <a href="/profile">{headerPage.profile}</a>
          </li>
          <li>
            <a href="/help">{headerPage.help}</a>
          </li>
          <li onClick={hadleLogout}>{headerPage.logout}</li>
        </ul>
      </div>
    </div>
  );
}
