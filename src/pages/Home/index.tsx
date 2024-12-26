import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "../../components/Header";
import StarRating from "../About";
import { useState } from "react";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth);
  // console.log("home", user);
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    console.log(`New Rating: ${newRating}`);
  };
  return (
    <div>
      <Header />
      <h1>Home</h1>
      <StarRating
        totalStars={5}
        initialRating={rating}
        onRate={handleRatingChange}
      />
    </div>
  );
}
