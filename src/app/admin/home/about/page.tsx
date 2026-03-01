"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, ArrowLeft, X, PlusSquare, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomeAboutAdmin() {
    const [content, setContent] = useState<any>({
        previewTitle: "",
        yearsEx: "",
        text: "",
        imageUrl: "",
        checkItems: []
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/api/home-about")
            .then(res => res.json())
            .then(data => {
                if (data) setContent({
                    previewTitle: data.previewTitle || "",
                    yearsEx: data.yearsEx || "",
                    text: data.text || "",
                    imageUrl: data.imageUrl || "",
                    checkItems: data.checkItems || []
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
            const res = await fetch("http://localhost:5000/api/home-about", {
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const fd = new FormData();
        fd.append("image", file);

        try {
            const res = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: fd
            });
            const data = await res.json();
            if (data.imageUrl) {
                setContent((prev: any) => ({ ...prev, imageUrl: data.imageUrl }));
            }
        } catch (err) {
            console.error(err);
            alert("Image upload failed");
        }
        setUploading(false);
    };

    const addCheckItem = () => {
        setContent({
            ...content,
            checkItems: [...content.checkItems, { icon: "CheckCircle2", text: "", color: "text-emerald-500", bg: "bg-emerald-50" }]
        });
    };

    const removeCheckItem = (index: number) => {
        const newItems = [...content.checkItems];
        newItems.splice(index, 1);
        setContent({ ...content, checkItems: newItems });
    };

    const updateCheckItem = (index: number, field: string, value: string) => {
        const newItems = [...content.checkItems];
        newItems[index] = { ...newItems[index], [field]: value };
        setContent({ ...content, checkItems: newItems });
    };

    if (fetching) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link href="/admin" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary mb-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                    <h1 className="text-3xl font-display font-bold">About Section (Home)</h1>
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
                <p className="text-muted-foreground text-sm">This content appears in the About section specifically on the Homepage.</p>

                {/* Image Upload */}
                <div className="space-y-4">
                    <label className="text-sm font-semibold">Section Image</label>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="aspect-video rounded-2xl overflow-hidden bg-muted border border-dashed border-border flex items-center justify-center relative group">
                            {content.imageUrl ? (
                                <>
                                    <Image src={content.imageUrl} alt="Preview" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            onClick={() => setContent({ ...content, imageUrl: "" })}
                                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-6 text-muted-foreground">
                                    {uploading ? <Loader2 className="w-10 h-10 mx-auto mb-2 animate-spin opacity-20" /> : <PlusSquare className="w-10 h-10 mx-auto mb-2 opacity-20" />}
                                    <p className="text-xs">{uploading ? "Uploading..." : "No image uploaded"}</p>
                                </div>
                            )}
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Upload a high-quality image that represents your business excellence. This will be shown alongside the text.
                            </p>
                            <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold text-sm cursor-pointer hover:bg-primary/20 transition-colors w-fit">
                                <Upload className="w-4 h-4" />
                                {uploading ? "Uploading..." : "Upload Image"}
                                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={uploading} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Title (Heading above text)</label>
                        <input
                            type="text"
                            value={content.previewTitle}
                            onChange={e => setContent({ ...content, previewTitle: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="e.g. Crafting Excellence Since 2016"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Experience Badge (e.g. 8+)</label>
                        <input
                            type="text"
                            value={content.yearsEx}
                            onChange={e => setContent({ ...content, yearsEx: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="e.g. 8+"
                        />
                    </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                    <label className="text-sm font-semibold">Description Text</label>
                    <textarea
                        value={content.text}
                        onChange={e => setContent({ ...content, text: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                        placeholder="Enter the section description..."
                    />
                </div>

                {/* Check Items */}
                <div className="space-y-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                            Key Points (Check Items)
                        </label>
                        <button
                            onClick={addCheckItem}
                            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                        >
                            <PlusSquare className="w-3.5 h-3.5" /> Add Point
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.checkItems.map((item: any, idx: number) => (
                            <div key={idx} className="p-4 rounded-xl bg-muted border border-border relative group/item">
                                <button
                                    onClick={() => removeCheckItem(idx)}
                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity z-10"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <div className="flex-1 space-y-1">
                                            <label className="text-[10px] uppercase font-bold text-muted-foreground">Text</label>
                                            <input
                                                type="text"
                                                value={item.text}
                                                onChange={e => updateCheckItem(idx, "text", e.target.value)}
                                                className="w-full px-2 py-1.5 rounded-lg bg-background border border-border text-xs focus:border-primary outline-none"
                                                placeholder="e.g. Premium quality materials"
                                            />
                                        </div>
                                        <div className="w-24 space-y-1">
                                            <label className="text-[10px] uppercase font-bold text-muted-foreground">Icon</label>
                                            <select
                                                value={item.icon}
                                                onChange={e => updateCheckItem(idx, "icon", e.target.value)}
                                                className="w-full px-2 py-1.5 rounded-lg bg-background border border-border text-xs focus:border-primary outline-none"
                                            >
                                                <option value="CheckCircle2">Check</option>
                                                <option value="Clock">Clock</option>
                                                <option value="Sparkles">Sparkles</option>
                                                <option value="Zap">Zap</option>
                                                <option value="Star">Star</option>
                                                <option value="Shield">Shield</option>
                                                <option value="Phone">Phone</option>
                                                <option value="Package">Package</option>
                                                <option value="Gift">Gift</option>
                                                <option value="Truck">Truck</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex-1 space-y-1">
                                            <label className="text-[10px] uppercase font-bold text-muted-foreground">Color Class</label>
                                            <input
                                                type="text"
                                                value={item.color}
                                                onChange={e => updateCheckItem(idx, "color", e.target.value)}
                                                className="w-full px-2 py-1.5 rounded-lg bg-background border border-border text-[10px] focus:border-primary outline-none font-mono"
                                                placeholder="e.g. text-emerald-500"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <label className="text-[10px] uppercase font-bold text-muted-foreground">BG Class</label>
                                            <input
                                                type="text"
                                                value={item.bg}
                                                onChange={e => updateCheckItem(idx, "bg", e.target.value)}
                                                className="w-full px-2 py-1.5 rounded-lg bg-background border border-border text-[10px] focus:border-primary outline-none font-mono"
                                                placeholder="e.g. bg-emerald-50"
                                            />
                                        </div>
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
