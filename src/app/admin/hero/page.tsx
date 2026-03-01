"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Edit, Image as ImageIcon, Link as LinkIcon, Star, Info, Loader2, X } from "lucide-react";
import Image from "next/image";

export default function AdminHero() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        titleAccent: "",
        subtitle: "",
        imageUrl: "",
        ctaText: "Get Started",
        ctaLink: "/contact",
        secondaryCtaText: "",
        secondaryCtaLink: "",
        badge: "New Arrival"
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const [uploading, setUploading] = useState(false);

    const fetchItems = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/hero");
            const data = await res.json();
            setItems(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

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
                setFormData(prev => ({ ...prev, imageUrl: data.imageUrl }));
            }
        } catch (err) {
            console.error(err);
            alert("Image upload failed");
        }
        setUploading(false);
    };

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        const token = localStorage.getItem("adminToken");
        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `http://localhost:5000/api/hero/${editingId}`
            : "http://localhost:5000/api/hero";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setFormData({
                    title: "",
                    titleAccent: "",
                    subtitle: "",
                    imageUrl: "",
                    ctaText: "Get Started",
                    ctaLink: "/contact",
                    secondaryCtaText: "",
                    secondaryCtaLink: "",
                    badge: "New Arrival"
                });
                setEditingId(null);
                fetchItems();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (item: any) => {
        setFormData({
            title: item.title,
            titleAccent: item.titleAccent || "",
            subtitle: item.subtitle,
            imageUrl: item.imageUrl,
            ctaText: item.ctaText,
            ctaLink: item.ctaLink,
            secondaryCtaText: item.secondaryCtaText || "",
            secondaryCtaLink: item.secondaryCtaLink || "",
            badge: item.badge
        });
        setEditingId(item._id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this slide?")) return;
        const token = localStorage.getItem("adminToken");
        try {
            await fetch(`http://localhost:5000/api/hero/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8 pr-4">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">Manage Hero Slides</h1>
                    <p className="text-muted-foreground">Customize the main landing page carousel slides.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <motion.form
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onSubmit={handleSubmit}
                        className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24"
                    >
                        <h3 className="text-lg font-bold font-display mb-4">
                            {editingId ? "Edit Slide" : "Add New Slide"}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Badge Title</label>
                                <input required type="text" value={formData.badge} onChange={e => setFormData({ ...formData, badge: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. New Collection" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Headline</label>
                                <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary" placeholder="Big bold text..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Headline Accent (Colored)</label>
                                <input type="text" value={formData.titleAccent} onChange={e => setFormData({ ...formData, titleAccent: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary" placeholder="Special highlighted text..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Subtitle</label>
                                <textarea required rows={2} value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary" placeholder="Smaller secondary text..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Hero Image</label>
                                <div className="space-y-3">
                                    {formData.imageUrl && (
                                        <div className="w-full aspect-video rounded-lg overflow-hidden border border-border relative group/img">
                                            <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, imageUrl: "" })}
                                                className="absolute top-2 right-2 p-1 bg-rose-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    )}
                                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-2 pb-2">
                                            {uploading ? <Plus className="w-6 h-6 animate-spin text-muted-foreground" /> : <Plus className="w-6 h-6 text-muted-foreground mb-1" />}
                                            <p className="text-xs text-muted-foreground">Upload Hero Image</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                    <input type="hidden" value={formData.imageUrl} required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Primary CTA text</label>
                                    <input required type="text" value={formData.ctaText} onChange={e => setFormData({ ...formData, ctaText: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm" placeholder="Button text" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Primary Link</label>
                                    <input required type="text" value={formData.ctaLink} onChange={e => setFormData({ ...formData, ctaLink: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary text-sm" placeholder="/services" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-muted-foreground">Secondary text (Optional)</label>
                                    <input type="text" value={formData.secondaryCtaText} onChange={e => setFormData({ ...formData, secondaryCtaText: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 outline-none focus:ring-2 focus:ring-primary text-sm italic" placeholder="e.g. WhatsApp Us" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-muted-foreground">Secondary Link</label>
                                    <input type="text" value={formData.secondaryCtaLink} onChange={e => setFormData({ ...formData, secondaryCtaLink: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 outline-none focus:ring-2 focus:ring-primary text-sm italic" placeholder="https://..." />
                                </div>
                            </div>
                            <button type="submit" disabled={submitting} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                                {editingId ? "Update Slide" : "Add Slide"}
                            </button>
                            {editingId && (
                                <button type="button" onClick={() => { setEditingId(null); setFormData({ title: "", titleAccent: "", subtitle: "", imageUrl: "", ctaText: "Get Started", ctaLink: "/contact", secondaryCtaText: "", secondaryCtaLink: "", badge: "New Arrival" }); }} className="w-full py-2 rounded-lg border border-border hover:bg-accent text-sm font-medium transition-colors">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </motion.form>
                </div>

                <div className="lg:col-span-2">
                    {loading ? (
                        <div className="text-center py-12">Loading slides...</div>
                    ) : (
                        <div className="grid gap-6">
                            {items.map((item, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={item._id}
                                    className="bg-card border border-border rounded-2xl overflow-hidden group shadow-sm flex md:flex-row flex-col"
                                >
                                    <div className="md:w-48 w-full h-48 bg-muted relative shrink-0">
                                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button onClick={() => handleEdit(item)} className="p-2 bg-white rounded-lg text-primary hover:bg-primary hover:text-white transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(item._id)} className="p-2 bg-white rounded-lg text-destructive hover:bg-destructive hover:text-white transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col justify-center gap-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{item.badge}</span>
                                        <h4 className="font-display font-bold text-xl leading-tight">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{item.subtitle}</p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                                <LinkIcon className="w-3.5 h-3.5" />
                                                {item.ctaLink}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                                <ImageIcon className="w-3.5 h-3.5" />
                                                Visible on Home
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {items.length === 0 && (
                                <div className="text-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-2xl">
                                    No hero slides found. Add your first slide to start.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
