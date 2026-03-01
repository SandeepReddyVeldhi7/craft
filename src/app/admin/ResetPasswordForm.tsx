"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const searchParams = useSearchParams(); // ✅ safe here
    const token = searchParams.get("token");

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, newPassword: password }),
        });

        const data: { message?: string } = await res.json();
        setMsg(data.message || "Password updated");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <form
                onSubmit={handleReset}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                >
                    Reset Password
                </button>

                {msg && <p className="mt-4 text-center text-green-600">{msg}</p>}
            </form>
        </div>
    );
}