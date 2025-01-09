import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";

import Templates from "./pages/Templates";
import TemplateEditor from "./pages/TemplateEditor";
import ResumeItem from "./pages/ResumeItem";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-resume" element={<TemplateEditor />} />
      <Route path="/resume/:id" element={<ResumeItem />} />
    </Routes>
  );
}

export default App;
