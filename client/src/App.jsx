import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Forgot from "./Pages/Forgot";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <LoggedIn>
              <Login />
            </LoggedIn>
          }
        />

        <Route
          path="/signup"
          element={
            <LoggedIn>
              <Signup />
            </LoggedIn>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot"
          element={
            <LoggedIn>
              <Forgot />
            </LoggedIn>
          }
        />
      </Routes>
    </>
  );
}

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

const LoggedIn = ({ isAuthenticated, children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default App;
