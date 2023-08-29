import { Routes, Route, Navigate } from "react-router-dom";
import "./assets/style/general.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { useSelector } from "react-redux";
import ProjectPage from "./pages/ProjectPage";
import Catalog from "./pages/Catalog";
import Creation from "./pages/Creation";
import AdminPanel from "./pages/AdminPanel";
import ModeratorCabinet from "./pages/ModeratorCabinet";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userId = useSelector((state) => state.auth.userId);
  const role = useSelector((state) => state.auth.role);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/user/:id" element={<Profile sec="user" />} />
      <Route
        path="/profile/projects/:id"
        element={isAuth ? <Profile sec="projects" /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile/queries/:id"
        element={isAuth ? <Profile sec="queries" /> : <Navigate to="/login" />}
      />
      <Route path="/profile/:id" element={<Profile sec="user" />} />
      <Route
        path="/login"
        element={
          isAuth ? (
            <Navigate to={"/profile/" + userId} />
          ) : (
            <Login login_section="login" />
          )
        }
      />
      <Route path="/project/:id" element={<ProjectPage />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route
        path="/createproject"
        element={isAuth ? <Creation /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin"
        element={
          isAuth && role == 2 ? <AdminPanel /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/moderator"
        element={
          isAuth && role == 3 ? <ModeratorCabinet /> : <Navigate to="/login" />
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
