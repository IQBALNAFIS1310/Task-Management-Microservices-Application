import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);

  // Ambil user dari localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(storedUser);
  }, []);

  // Jam realtime
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const displayName =
    user?.username === "admin"
      ? "Administrator (admin)"
      : user?.fullName || user?.username;

  return (
    <nav className="bg-blue-600 text-white shadow relative">
      <div className="px-4 sm:px-6 py-3 flex justify-between items-center">

        {/* LEFT */}
        <div className="text-lg sm:text-xl font-bold">
          Task Management
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span>👤</span>
            <span className="font-medium">{displayName}</span>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span>🕒</span>
            {time.toLocaleTimeString()}
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="sm:hidden bg-blue-700 px-4 py-3 space-y-3">
          <div className="flex items-center gap-2">
            <span>👤</span>
            <span>{displayName}</span>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span>🕒</span>
            {time.toLocaleTimeString()}
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-left"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
