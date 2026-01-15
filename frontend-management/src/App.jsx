import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUser from "./pages/DashboardUser";

function AppRoutes() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  // 🔥 Sync user setiap route berubah
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, [location.pathname]);

  return (
    <Routes>
      {/* ROOT */}
      <Route
        path="/"
        element={
          currentUser
            ? currentUser.username === "admin"
              ? <Navigate to="/admin" />
              : <Navigate to="/user" />
            : <Navigate to="/login" />
        }
      />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          currentUser?.username === "admin"
            ? <DashboardAdmin />
            : <Navigate to="/login" />
        }
      />

      {/* USER */}
      <Route
        path="/user"
        element={
          currentUser
            ? <DashboardUser />
            : <Navigate to="/login" />
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
