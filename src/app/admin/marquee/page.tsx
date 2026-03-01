"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Type, MessageSquare } from "lucide-react";

export default function AdminMarquee() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");

    const fetchItems = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/marquee");
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");
        try {
            const res = await fetch("http://localhost:5000/api/marquee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ text })
            });
            if (res.ok) {
                setText("");
                fetchItems();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem("adminToken");
        try {
            await fetch(`http://localhost:5000/api/marquee/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 pr-4">
                <h1 className="text-3xl font-display font-bold mb-2">Manage Marquee</h1>
                <p className="text-muted-foreground">Manage the text items that scroll across the screen.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
                        <label className="block text-sm font-medium mb-2">New Marquee Text</label>
                        <textarea required value={text} onChange={e => setText(e.target.value)} className="w-full px-3 py-2 mb-4 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Free Delivery on Bulk Orders..." rows={3} />
                        <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                            <Plus className="w-4 h-4" /> Add Item
                        </button>
                    </form>
                </div>

                <div className="md:col-span-2">
                    {loading ? (
                        <div className="text-center py-12">Loading marquee...</div>
                    ) : (
                        <div className="space-y-3">
                            {items.map((item, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={item._id}
                                    className="bg-card border border-border rounded-xl p-4 flex items-center justify-between group shadow-sm pr-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-accent/50 text-primary rounded-lg">
                                            <MessageSquare className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium text-sm">{item.text}</span>
                                    </div>
                                    <button onClick={() => handleDelete(item._id)} className="p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                            {items.length === 0 && (
                                <div className="text-center py-16 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                                    No marquee items found.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
