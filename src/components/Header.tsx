import { images } from "../assets/images";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { headerPage } from "../constants/commontext";

export default function Header() {
  const dispatch = useDispatch();

  const hadleLogout = () => {
    console.log("clicked");
    localStorage.removeItem("user");
    dispatch(logout());
    // window.location.href = "/";
  };
  return (
    <div className="flex justify-between items-center bg-slate-600 h-16 w-auto pr-5 shadow">
      <img className="h-full w-25" src={images.resumeLogo} alt="logo" />
      <div>
        <ul className="flex gap-5 text-white">
          <li>
            <a href="/home">{headerPage.home}</a>
          </li>
          <li>
            <a href="/about">{headerPage.about}</a>
          </li>
          <li>
            <a href="/templates">{headerPage.templates}</a>
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
