"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data: { message?: string } = await res.json();

        if (!res.ok) {
            setError(data.message || "Signup failed");
            return;
        }

        router.push("/login");
    };

    return (
        <form onSubmit={handleSignup} style={{ maxWidth: 400, margin: "auto" }}>
            <h2>Signup</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /><br />

            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br />

            <button type="submit">Signup</button>
        </form>
    );
}