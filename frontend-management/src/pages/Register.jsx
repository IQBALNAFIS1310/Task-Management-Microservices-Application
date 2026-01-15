import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/usersApi";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const user = await registerUser({ username, password, fullName });
            localStorage.setItem("currentUser", JSON.stringify(user));

            if (user.username === "admin") navigate("/admin");
            else navigate("/user");
        } catch (err) {
            setError(err.message || "Register gagal");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0b0f1a] overflow-hidden">
            
            {/* Glow */}
            <div className="absolute w-[500px] h-[500px] bg-green-500/30 rounded-full blur-[120px] top-[-120px] left-[-120px]" />
            <div className="absolute w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[120px] bottom-[-120px] right-[-120px]" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md p-8 rounded-2xl
                            bg-white/10 backdrop-blur-xl border border-white/20
                            shadow-2xl">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white tracking-wide">
                        CREATE <span className="text-green-400">ACCOUNT</span>
                    </h1>
                    <p className="text-gray-300 text-sm mt-2">
                        Join the modern task system
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-5">

                    {/* Full Name */}
                    <div>
                        <label className="text-xs text-gray-300 uppercase tracking-wide">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="mt-2 w-full px-4 py-3 rounded-lg
                                       bg-black/30 text-white
                                       border border-white/20
                                       focus:outline-none focus:border-green-400"
                            placeholder="Your full name"
                            required
                        />
                    </div>

                    {/* Username */}
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
                                       focus:outline-none focus:border-green-400"
                            placeholder="Choose a username"
                            required
                        />
                    </div>

                    {/* Password */}
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
                                           focus:outline-none focus:border-green-400"
                                placeholder="••••••••"
                                required
                            />

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
                                   bg-gradient-to-r from-green-500 to-emerald-600
                                   text-white tracking-wide
                                   hover:scale-[1.02] hover:shadow-lg transition"
                    >
                        CREATE ACCOUNT
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <a href="/login" className="text-green-400 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
