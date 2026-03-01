"use client";

import { useState, useEffect } from "react";
import { Save, Upload, Loader2, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BannerEditorProps {
    pageTitle: string;
    apiEndpoint: string;
    backPath: string;
}

export default function BannerEditor({ pageTitle, apiEndpoint, backPath }: BannerEditorProps) {
    const [banner, setBanner] = useState({
        title: "",
        subtitle: "",
        imageUrl: "",
        badge: "",
        stats: [] as { label: string; icon: string }[]
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetch(apiEndpoint)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setBanner({
                        title: data.title || "",
                        subtitle: data.subtitle || "",
                        imageUrl: data.imageUrl || "",
                        badge: data.badge || "",
                        stats: data.stats || []
                    });
                }
                setFetching(false);
            })
            .catch(err => {
                console.error(err);
                setFetching(false);
            });
    }, [apiEndpoint]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("adminToken");
            const res = await fetch(apiEndpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(banner)
            });
            if (res.ok) alert("Banner updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update banner.");
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
            if (data.imageUrl) {
                setBanner({ ...banner, imageUrl: data.imageUrl });
            } else if (data.url) {
                setBanner({ ...banner, imageUrl: data.url });
            }
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
                    <Link href={backPath} className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary mb-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                    <h1 className="text-3xl font-display font-bold">{pageTitle} Banner</h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-primary/20"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-6">
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Banner Badge (Small text at top)</label>
                        <input
                            type="text"
                            value={banner.badge}
                            onChange={e => setBanner({ ...banner, badge: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="e.g. A&A Pixel & Crafts"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Banner Title</label>
                        <input
                            type="text"
                            value={banner.title}
                            onChange={e => setBanner({ ...banner, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="e.g. Our Services"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Banner Subtitle</label>
                        <textarea
                            value={banner.subtitle}
                            onChange={e => setBanner({ ...banner, subtitle: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                            placeholder="Brief description for the top of the page..."
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-sm font-semibold">Background Image</label>
                        <div className="flex flex-col sm:flex-row gap-6">
                            {banner.imageUrl && (
                                <div className="w-full sm:w-64 aspect-video rounded-xl overflow-hidden border border-border shadow-inner relative group/img">
                                    <Image src={banner.imageUrl} alt="Banner Preview" fill className="object-cover" />
                                    <button
                                        onClick={() => setBanner({ ...banner, imageUrl: "" })}
                                        className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <div className="flex-1">
                                <label className="flex flex-col items-center justify-center w-full h-full min-h-[120px] border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-all group">
                                    <div className="flex flex-col items-center justify-center p-4 text-center">
                                        {uploading ? (
                                            <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                                        ) : (
                                            <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary mb-2 transition-colors" />
                                        )}
                                        <p className="text-sm font-medium text-foreground">Click to upload new image</p>
                                        <p className="text-xs text-muted-foreground mt-1">Recommended size: 1920x600px</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dynamic Stats Section */}
                <div className="pt-6 border-t border-border">
                    <h3 className="text-lg font-bold font-display mb-4 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs italic">i</span>
                        Banner Highlights (Stats)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="p-4 rounded-xl bg-muted/30 border border-border space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Highlight {index + 1}</span>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    <div className="col-span-1 space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-muted-foreground px-1">Icon</label>
                                        <input
                                            type="text"
                                            value={banner.stats[index]?.icon || ""}
                                            onChange={e => {
                                                const newStats = [...banner.stats];
                                                if (!newStats[index]) newStats[index] = { label: "", icon: "" };
                                                newStats[index].icon = e.target.value;
                                                setBanner({ ...banner, stats: newStats });
                                            }}
                                            placeholder="🤝"
                                            className="w-full px-3 py-2 rounded-lg bg-background border border-border text-center text-lg"
                                        />
                                    </div>
                                    <div className="col-span-3 space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-muted-foreground px-1">Label</label>
                                        <input
                                            type="text"
                                            value={banner.stats[index]?.label || ""}
                                            onChange={e => {
                                                const newStats = [...banner.stats];
                                                if (!newStats[index]) newStats[index] = { label: "", icon: "" };
                                                newStats[index].label = e.target.value;
                                                setBanner({ ...banner, stats: newStats });
                                            }}
                                            placeholder="500+ Clients"
                                            className="w-full px-3 py-2 rounded-lg bg-background border border-border"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
