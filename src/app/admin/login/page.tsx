"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        role: string;
    };
}

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const res = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data: LoginResponse | { message: string } = await res.json();

        if (!res.ok) {
            setError("message" in data ? data.message : "Login failed");
            return;
        }
        if (!("token" in data)) {
            setError("Invalid login response");
            return;
        }
        localStorage.setItem("token", data.token);
        router.push("/admin/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

                {error && (
                    <p className="bg-red-100 text-red-600 p-2 mb-4 rounded">
                        {error}
                    </p>
                )}

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="admin@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>

                <div className="flex justify-between mt-4 text-sm">
                    <a href="/admin/forgot-password" className="text-blue-600 hover:underline">
                        Forgot password?
                    </a>
                    <a href="/admin/signup" className="text-blue-600 hover:underline">
                        Create admin
                    </a>
                </div>
            </form>
        </div>
    );
}