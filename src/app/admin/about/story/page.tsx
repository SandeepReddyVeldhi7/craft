"use client";

import { useState, useEffect } from "react";
import { Save, Upload, Loader2, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutStoryAdmin() {
    const [story, setStory] = useState({
        title: "",
        text: "",
        imageUrl: ""
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/api/about")
            .then(res => res.json())
            .then(data => {
                if (data && data.story) setStory(data.story);
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
            // Fetch current about content first to merge
            const currentRes = await fetch("http://localhost:5000/api/about");
            const currentData = await currentRes.json();

            const res = await fetch("http://localhost:5000/api/about", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ ...currentData, story })
            });
            if (res.ok) alert("Story updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update story.");
        }
        setLoading(false);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (data.imageUrl) setStory({ ...story, imageUrl: data.imageUrl });
            else if (data.url) setStory({ ...story, imageUrl: data.url });
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
        setUploading(false);
    };

    if (fetching) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link href="/admin" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary mb-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                    <h1 className="text-3xl font-display font-bold">Main Story</h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Story Title</label>
                        <input
                            type="text"
                            value={story.title}
                            onChange={e => setStory({ ...story, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Story Text</label>
                        <textarea
                            value={story.text}
                            onChange={e => setStory({ ...story, text: e.target.value })}
                            rows={8}
                            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none resize-none"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-sm font-semibold">Story Image</label>
                        <div className="flex flex-col sm:flex-row gap-6">
                            {story.imageUrl && (
                                <div className="w-full sm:w-64 aspect-video rounded-xl overflow-hidden border border-border shadow-inner relative group/img">
                                    <Image src={story.imageUrl} alt="Story Preview" fill className="object-cover" />
                                    <button
                                        onClick={() => setStory({ ...story, imageUrl: "" })}
                                        className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <div className="flex-1">
                                <label className="flex flex-col items-center justify-center w-full h-full min-h-[120px] border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-muted/50 transition-all">
                                    <div className="flex flex-col items-center justify-center p-4">
                                        {uploading ? <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" /> : <Upload className="w-8 h-8 text-muted-foreground mb-2" />}
                                        <p className="text-sm font-medium">Click to upload story image</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
