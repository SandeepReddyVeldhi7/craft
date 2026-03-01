"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HomeServicesAdmin() {
    const [content, setContent] = useState({
        title: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/home-services")
            .then(res => res.json())
            .then(data => {
                if (data) setContent({
                    title: data.title || "",
                    description: data.description || ""
                });
                setFetching(false);
            })
            .catch(err => {
                console.error(err);
                setFetching(false);
            });
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch("http://localhost:5000/api/home-services", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(content)
            });
            if (res.ok) alert("Data updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update data.");
        }
        setLoading(false);
    };

    if (fetching) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link href="/admin" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary mb-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                    <h1 className="text-3xl font-display font-bold">What We Offer Section (Home)</h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-8">
                <p className="text-muted-foreground text-sm">This content appears in the "What We Offer" section specifically on the Homepage.</p>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Section Title</label>
                        <input
                            type="text"
                            value={content.title}
                            onChange={e => setContent({ ...content, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="e.g. Premium Branding & Print Services"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Section Description</label>
                        <textarea
                            value={content.description}
                            onChange={e => setContent({ ...content, description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                            placeholder="Enter the section description..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
