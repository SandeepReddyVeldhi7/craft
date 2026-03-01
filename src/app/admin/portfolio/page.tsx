"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Edit, Loader2, X } from "lucide-react";
import Image from "next/image";

export default function AdminPortfolio() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("T-Shirts");
    const [imageUrl, setImageUrl] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    const [uploading, setUploading] = useState(false);

    const fetchItems = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/portfolio");
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
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.url) {
                setImageUrl(data.url);
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
        const payload = { title, category, imageUrl };
        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `http://localhost:5000/api/portfolio/${editingId}`
            : "http://localhost:5000/api/portfolio";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setTitle("");
                setCategory("T-Shirts");
                setImageUrl("");
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
        setTitle(item.title);
        setCategory(item.category);
        setImageUrl(item.imageUrl);
        setEditingId(item._id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        const token = localStorage.getItem("adminToken");
        try {
            await fetch(`http://localhost:5000/api/portfolio/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">Project Gallery</h1>
                    <p className="text-muted-foreground">Add, update or remove portfolio items.</p>
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
                            {editingId ? "Edit Item" : "Add New Item"}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Corporate Welcome Kit" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <input required type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. T-Shirts" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Portfolio Image</label>
                                <div className="space-y-3">
                                    {imageUrl && (
                                        <div className="w-full aspect-video rounded-lg overflow-hidden border border-border relative group/img">
                                            <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setImageUrl("")}
                                                className="absolute top-2 right-2 p-1 bg-rose-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    )}
                                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-2 pb-2">
                                            {uploading ? <Plus className="w-6 h-6 animate-spin text-muted-foreground" /> : <Plus className="w-6 h-6 text-muted-foreground mb-1" />}
                                            <p className="text-xs text-muted-foreground">Upload Image</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                    <input type="hidden" value={imageUrl} required />
                                </div>
                            </div>
                            <button type="submit" disabled={submitting} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-primary/10">
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                                {editingId ? "Update Item" : "Add Item"}
                            </button>
                            {editingId && (
                                <button type="button" onClick={() => { setEditingId(null); setTitle(''); setImageUrl(''); }} className="w-full py-2 rounded-lg border border-border hover:bg-accent text-sm font-medium transition-colors">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </motion.form>
                </div>

                <div className="lg:col-span-2">
                    {loading ? (
                        <div className="text-center py-10">Loading portfolio...</div>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-4">
                            {items.map((item, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={item._id}
                                    className="bg-card border border-border rounded-xl overflow-hidden group shadow-sm flex flex-col"
                                >
                                    <div className="aspect-[4/3] bg-muted relative">
                                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(item)} className="p-2 bg-background/80 backdrop-blur rounded-lg text-foreground hover:text-primary transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(item._id)} className="p-2 bg-destructive/90 backdrop-blur rounded-lg text-destructive-foreground hover:bg-destructive transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <span className="text-xs font-semibold uppercase text-secondary mb-1 block">{item.category}</span>
                                        <h4 className="font-display font-bold leading-tight">{item.title}</h4>
                                    </div>
                                </motion.div>
                            ))}
                            {items.length === 0 && (
                                <div className="col-span-2 text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                                    No portfolio items found. Create one to get started.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
