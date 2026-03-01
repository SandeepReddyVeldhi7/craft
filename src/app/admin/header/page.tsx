"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Upload, ArrowLeft, Loader2, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeaderAdmin() {
    const [config, setConfig] = useState<any>({
        logoText: "A&A Pixel",
        brandName: "A&A Pixel & CRAFTS",
        tagline: "Custom Printing & Corporate Gifting",
        whatsapp: "+91 9100760587",
        phone: "+91 9100760587",
        navLinks: [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Contact", href: "/contact" }
        ]
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/api/header")
            .then(res => res.json())
            .then(data => {
                if (data && data.logoText) setConfig(data);
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
            const res = await fetch("http://localhost:5000/api/header", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config)
            });
            if (res.ok) alert("Header updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update header.");
        }
        setLoading(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.imageUrl) {
                setConfig({ ...config, logoImage: data.imageUrl });
            } else if (data.url) {
                setConfig({ ...config, logoImage: data.url });
            }
        } catch (err) {
            console.error(err);
            alert("Image upload failed");
        }
        setUploading(false);
    };

    if (fetching) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link href="/admin" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary mb-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-display font-bold">Header Settings</h1>
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

            <div className="grid gap-6">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold mb-4">Branding</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Logo Text</label>
                            <input
                                type="text"
                                value={config.logoText}
                                onChange={e => setConfig({ ...config, logoText: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Brand Name</label>
                            <input
                                type="text"
                                value={config.brandName}
                                onChange={e => setConfig({ ...config, brandName: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium">Tagline</label>
                            <input
                                type="text"
                                value={config.tagline}
                                onChange={e => setConfig({ ...config, tagline: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold mb-4">Contact Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">WhatsApp Number</label>
                            <input
                                type="text"
                                value={config.whatsapp}
                                onChange={e => setConfig({ ...config, whatsapp: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Phone Number</label>
                            <input
                                type="text"
                                value={config.phone}
                                onChange={e => setConfig({ ...config, phone: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold mb-4">Logo Image (Optional)</h2>
                    <div className="flex items-center gap-6">
                        {config.logoImage && (
                            <div className="w-20 h-20 rounded-lg overflow-hidden border border-border bg-muted relative group/img">
                                <Image src={config.logoImage} alt="Logo" fill className="object-contain" />
                                <button
                                    onClick={() => setConfig({ ...config, logoImage: "" })}
                                    className="absolute top-1 right-1 p-0.5 bg-rose-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                        <div className="flex-1">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {uploading ? <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /> : <Upload className="w-8 h-8 text-muted-foreground mb-2" />}
                                    <p className="text-sm text-muted-foreground">Click to upload logo</p>
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
