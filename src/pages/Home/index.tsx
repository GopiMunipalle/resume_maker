import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "../../components/Header";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth);
  console.log("home", user);
  return (
    <div>
      <Header />
      <h1>Home</h1>
    </div>
  );
}
