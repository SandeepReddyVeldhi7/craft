"use client";

import { useState, useEffect } from "react";
import { Save, Upload, Loader2, ArrowLeft, Plus, Trash2, CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutWhyAdmin() {
    const [content, setContent] = useState<any>({
        whyUs: { title: "", text: "", imageUrl: "" },
        values: []
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/api/about")
            .then(res => res.json())
            .then(data => {
                if (data) setContent({
                    whyUs: data.whyUs || { title: "", text: "", imageUrl: "" },
                    values: data.values || []
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
            const currentRes = await fetch("http://localhost:5000/api/about");
            const currentData = await currentRes.json();

            const res = await fetch("http://localhost:5000/api/about", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ ...currentData, ...content })
            });
            if (res.ok) alert("Data updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update data.");
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
            if (data.imageUrl) setContent({ ...content, whyUs: { ...content.whyUs, imageUrl: data.imageUrl } });
            else if (data.url) setContent({ ...content, whyUs: { ...content.whyUs, imageUrl: data.url } });
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
        setUploading(false);
    };

    const addValue = () => {
        setContent({ ...content, values: [...content.values, { title: "", icon: "CheckCircle2" }] });
    };

    const removeValue = (index: number) => {
        const newValues = [...content.values];
        newValues.splice(index, 1);
        setContent({ ...content, values: newValues });
    };

    const updateValue = (index: number, title: string) => {
        const newValues = [...content.values];
        newValues[index].title = title;
        setContent({ ...content, values: newValues });
    };

    if (fetching) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link href="/admin" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary mb-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                    <h1 className="text-3xl font-display font-bold">Why Choose Us</h1>
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

            <div className="grid gap-8">
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold font-display">Section Details</h2>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Title</label>
                            <input
                                type="text"
                                value={content.whyUs.title}
                                onChange={e => setContent({ ...content, whyUs: { ...content.whyUs, title: e.target.value } })}
                                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Description Text</label>
                            <textarea
                                value={content.whyUs.text}
                                onChange={e => setContent({ ...content, whyUs: { ...content.whyUs, text: e.target.value } })}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none resize-none"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-semibold">Section Image</label>
                            <div className="flex flex-col sm:flex-row gap-6">
                                {content.whyUs.imageUrl && (
                                    <div className="w-full sm:w-64 aspect-video rounded-xl overflow-hidden border border-border relative group/img">
                                        <Image src={content.whyUs.imageUrl} alt="Preview" fill className="object-cover" />
                                        <button
                                            onClick={() => setContent({ ...content, whyUs: { ...content.whyUs, imageUrl: "" } })}
                                            className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <label className="flex flex-col items-center justify-center w-full h-full min-h-[120px] border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-muted/50 transition-all">
                                        <div className="flex flex-col items-center justify-center p-4">
                                            {uploading ? <Loader2 className="w-8 h-8 animate-spin text-primary" /> : <Upload className="w-8 h-8 text-muted-foreground" />}
                                            <p className="text-sm font-medium mt-2">Click to upload section image</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold font-display">Trust Items (Points)</h2>
                        <button onClick={addValue} className="flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline">
                            <Plus className="w-4 h-4" /> Add Item
                        </button>
                    </div>
                    <div className="grid gap-4">
                        {content.values.map((v: any, i: number) => (
                            <div key={i} className="flex gap-3 group animate-in fade-in slide-in-from-left-2 transition-all">
                                <div className="flex-1 flex items-center gap-3 bg-muted/50 border border-border rounded-xl px-4 py-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <input
                                        type="text"
                                        value={v.title}
                                        onChange={e => updateValue(i, e.target.value)}
                                        placeholder="e.g. Premium Quality Prints"
                                        className="bg-transparent border-none outline-none w-full text-sm font-medium"
                                    />
                                </div>
                                <button onClick={() => removeValue(i)} className="p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        {content.values.length === 0 && (
                            <div className="text-center py-6 text-muted-foreground text-sm">No trust items added yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
