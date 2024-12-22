import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { useEffect, useState } from "react";
import {
  initializeData,
  initialState,
  setUser,
} from "./redux/slices/authSlice";
import Templates from "./pages/Templates";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeState = async () => {
      const data = await initializeData(); // Initialize data from localStorage
      if (data && data.token) {
        // Check if user data exists
        dispatch(
          setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            token: data.token,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            isLoading: false,
            error: null,
            isLoggedIn: true,
          })
        );
      } else {
        dispatch(setUser({ ...initialState, isLoggedIn: false })); // Handle logged-out state
      }
      setLoading(false);
    };

    initializeState();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/templates" element={<Templates />} />
    </Routes>
  );
}

export default App;
