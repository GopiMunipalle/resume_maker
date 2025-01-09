import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "../../components/Header";
import { useState } from "react";

export default function Home() {
  const user = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <Header />
      <h1>Home</h1>
    </div>
  );
}
