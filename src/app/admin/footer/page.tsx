"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, ArrowLeft, Loader2, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function FooterAdmin() {
    const [config, setConfig] = useState<any>({
        companyName: "A&A Pixel & CRAFTS",
        tagline: "Your Pixel Perfect Branding Partner",
        socialLinks: [],
        quickLinks: []
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/footer")
            .then(res => res.json())
            .then(data => {
                if (data && data.companyName) setConfig(data);
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
            const res = await fetch("http://localhost:5000/api/footer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config)
            });
            if (res.ok) alert("Footer updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update footer.");
        }
        setLoading(false);
    };

    const addSocial = () => {
        const platform = prompt("Enter platform (e.g. Instagram, Facebook)");
        if (!platform) return;
        setConfig({
            ...config,
            socialLinks: [...config.socialLinks, { platform, url: "", icon: platform.toLowerCase() }]
        });
    };

    const addQuickLink = () => {
        setConfig({
            ...config,
            quickLinks: [...config.quickLinks, { label: "", href: "" }]
        });
    };

    if (fetching) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link href="/admin" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary mb-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-display font-bold">Footer Settings</h1>
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
                    <h2 className="text-lg font-bold mb-4">Company Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Company Name</label>
                            <input
                                type="text"
                                value={config.companyName}
                                onChange={e => setConfig({ ...config, companyName: e.target.value })}
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
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Social Links</h2>
                        <button onClick={addSocial} className="flex items-center gap-1 text-sm text-primary hover:underline">
                            <Plus className="w-4 h-4" /> Add Social
                        </button>
                    </div>
                    <div className="grid gap-3">
                        {config.socialLinks.map((s: any, i: number) => (
                            <div key={i} className="flex gap-2">
                                <div className="w-32 px-4 py-2 rounded-lg bg-muted text-sm font-medium border border-border">{s.platform}</div>
                                <input
                                    type="text"
                                    value={s.url}
                                    onChange={e => {
                                        const newSocial = [...config.socialLinks];
                                        newSocial[i].url = e.target.value;
                                        setConfig({ ...config, socialLinks: newSocial });
                                    }}
                                    placeholder="https:// instagram.com/..."
                                    className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none text-sm"
                                />
                                <button
                                    onClick={() => {
                                        const newSocial = [...config.socialLinks];
                                        newSocial.splice(i, 1);
                                        setConfig({ ...config, socialLinks: newSocial });
                                    }}
                                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Quick Links</h2>
                        <button onClick={addQuickLink} className="flex items-center gap-1 text-sm text-primary hover:underline">
                            <Plus className="w-4 h-4" /> Add Link
                        </button>
                    </div>
                    <div className="grid gap-3">
                        {config.quickLinks.map((ql: any, i: number) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    type="text"
                                    value={ql.label}
                                    onChange={e => {
                                        const newLinks = [...config.quickLinks];
                                        newLinks[i].label = e.target.value;
                                        setConfig({ ...config, quickLinks: newLinks });
                                    }}
                                    placeholder="Label (e.g. Services)"
                                    className="w-1/3 px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none text-sm"
                                />
                                <input
                                    type="text"
                                    value={ql.href}
                                    onChange={e => {
                                        const newLinks = [...config.quickLinks];
                                        newLinks[i].href = e.target.value;
                                        setConfig({ ...config, quickLinks: newLinks });
                                    }}
                                    placeholder="Link (e.g. /services)"
                                    className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none text-sm"
                                />
                                <button
                                    onClick={() => {
                                        const newLinks = [...config.quickLinks];
                                        newLinks.splice(i, 1);
                                        setConfig({ ...config, quickLinks: newLinks });
                                    }}
                                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
