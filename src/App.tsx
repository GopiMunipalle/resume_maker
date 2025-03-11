import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import TemplateEditor from "./pages/TemplateEditor";
import ResumeItem from "./pages/ResumeItem";
import Profile from "./pages/Profile";
import HelpPage from "./pages/Help";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={<ProtectedRoutes allowedRoles={["user"]} Component={Home} />}
      />
      <Route
        path="/templates"
        element={
          <ProtectedRoutes allowedRoles={["user"]} Component={Templates} />
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoutes allowedRoles={["user"]} Component={Profile} />
        }
      />
      <Route
        path="/create-resume"
        element={
          <ProtectedRoutes allowedRoles={["user"]} Component={TemplateEditor} />
        }
      />
      <Route
        path="/resume/:id"
        element={
          <ProtectedRoutes allowedRoles={["user"]} Component={ResumeItem} />
        }
      />
      <Route
        path="/help"
        element={
          <ProtectedRoutes allowedRoles={["user"]} Component={HelpPage} />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
