"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

const pages = ["home", "about", "services", "portfolio", "contact"];

export default function CTAAdmin() {
    const [ctas, setCtas] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/cta")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCtas(data);
                setFetching(false);
            })
            .catch(err => {
                console.error(err);
                setFetching(false);
            });
    }, []);

    const handleSave = async (index: number) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/cta", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ctas[index])
            });
            if (res.ok) alert(`CTA for ${ctas[index].page} updated!`);
        } catch (err) {
            console.error(err);
            alert("Failed to update CTA.");
        }
        setLoading(false);
    };

    const updateCTA = (index: number, field: string, value: string) => {
        const newCtas = [...ctas];
        newCtas[index] = { ...newCtas[index], [field]: value };
        setCtas(newCtas);
    };

    const addCTA = (page: string) => {
        if (ctas.find(c => c.page === page)) return;
        setCtas([...ctas, {
            page,
            title: "Ready to Start?",
            subtitle: "Let's Work Together",
            desc: "Get in touch today for a free quote.",
            primaryBtnText: "Get Started",
            primaryBtnLink: "/contact",
            secondaryBtnText: "WhatsApp Us",
            secondaryBtnLink: "https://wa.me/919100760587"
        }]);
    };

    if (fetching) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link href="/admin" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary mb-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-display font-bold">Let's Work Together</h1>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
                {pages.map(p => (
                    <button
                        key={p}
                        onClick={() => addCTA(p)}
                        disabled={!!ctas.find(c => c.page === p)}
                        className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 disabled:opacity-50"
                    >
                        + Add {p} CTA
                    </button>
                ))}
            </div>

            <div className="grid gap-8">
                {ctas.map((cta, i) => (
                    <div key={cta.page} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold uppercase tracking-wider text-primary">{cta.page} Page CTA</h2>
                            <button
                                onClick={() => handleSave(i)}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Update {cta.page}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Main Title</label>
                                <input
                                    type="text"
                                    value={cta.title}
                                    onChange={e => updateCTA(i, "title", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Subtitle/Label</label>
                                <input
                                    type="text"
                                    value={cta.subtitle}
                                    onChange={e => updateCTA(i, "subtitle", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    value={cta.desc}
                                    onChange={e => updateCTA(i, "desc", e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none resize-none text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Primary Button Text</label>
                                <input
                                    type="text"
                                    value={cta.primaryBtnText}
                                    onChange={e => updateCTA(i, "primaryBtnText", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Primary Button Link</label>
                                <input
                                    type="text"
                                    value={cta.primaryBtnLink}
                                    onChange={e => updateCTA(i, "primaryBtnLink", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Secondary Button Text</label>
                                <input
                                    type="text"
                                    value={cta.secondaryBtnText}
                                    onChange={e => updateCTA(i, "secondaryBtnText", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Secondary Button Link</label>
                                <input
                                    type="text"
                                    value={cta.secondaryBtnLink}
                                    onChange={e => updateCTA(i, "secondaryBtnLink", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
