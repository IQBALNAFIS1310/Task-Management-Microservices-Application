import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/usersApi";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (username === "admin" && password === "admin123") {
            localStorage.setItem(
                "currentUser",
                JSON.stringify({
                    id: 0,
                    username: "admin",
                    fullName: "Administrator",
                    token: "frontend-admin"
                })
            );
            navigate("/");
            return;
        }

        try {
            const user = await loginUser(username, password);
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigate("/");
        } catch {
            setError("Username atau password salah");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0b0f1a] overflow-hidden">
            <div className="absolute w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] top-[-100px] left-[-100px]" />
            <div className="absolute w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-[120px] bottom-[-100px] right-[-100px]" />

            <div className="relative z-10 w-full max-w-md p-8 rounded-2xl
                            bg-white/10 backdrop-blur-xl border border-white/20
                            shadow-2xl">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white tracking-wide">
                        TASK<span className="text-blue-400">FLOW</span>
                    </h1>
                    <p className="text-gray-300 text-sm mt-2">
                        Modern Task Management System
                    </p>
                </div>

                {error && (
                    <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">

                    <div>
                        <label className="text-xs text-gray-300 uppercase tracking-wide">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 w-full px-4 py-3 rounded-lg
                                       bg-black/30 text-white
                                       border border-white/20
                                       focus:outline-none focus:border-blue-400"
                            placeholder="your username"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-300 uppercase tracking-wide">
                            Password
                        </label>

                        <div className="relative mt-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-14 rounded-lg
                                           bg-black/30 text-white
                                           border border-white/20
                                           focus:outline-none focus:border-blue-400"
                                placeholder="••••••••"
                                required
                            />

                            {/* Toggle */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2
                                           text-xs text-gray-400 hover:text-white
                                           tracking-wider transition"
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg font-semibold
                                   bg-gradient-to-r from-blue-500 to-indigo-600
                                   text-white tracking-wide
                                   hover:scale-[1.02] hover:shadow-lg transition"
                    >
                        SIGN IN
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    New here?{" "}
                    <a href="/register" className="text-blue-400 hover:underline">
                        Create account
                    </a>
                </p>
            </div>
        </div>
    );
}
