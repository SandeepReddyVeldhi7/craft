"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Edit, Hash, Type } from "lucide-react";

export default function AdminCounters() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        target: 0,
        label: "",
        suffix: "+",
        icon: "Users",
        gradient: "from-blue-500 to-cyan-500",
        glow: "shadow-blue-500/30",
        bg: "from-blue-500/10 to-cyan-500/10",
        border: "border-blue-500/20",
        desc: ""
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchItems = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/counters");
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
        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `http://localhost:5000/api/counters/${editingId}`
            : "http://localhost:5000/api/counters";

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
                    target: 0,
                    label: "",
                    suffix: "+",
                    icon: "Users",
                    gradient: "from-blue-500 to-cyan-500",
                    glow: "shadow-blue-500/30",
                    bg: "from-blue-500/10 to-cyan-500/10",
                    border: "border-blue-500/20",
                    desc: ""
                });
                setEditingId(null);
                fetchItems();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8 pr-4">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">Our Numbers Speak</h1>
                    <p className="text-muted-foreground">Manage the success metrics shown on the landing page.</p>
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
                        <h3 className="text-lg font-bold font-display mb-4 pr-4">
                            {editingId ? "Edit Counter" : "Add New Counter"}
                        </h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Target No.</label>
                                    <input required type="number" value={formData.target} onChange={e => setFormData({ ...formData, target: parseInt(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. 500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Suffix</label>
                                    <input required type="text" value={formData.suffix} onChange={e => setFormData({ ...formData, suffix: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. +" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Label</label>
                                <input required type="text" value={formData.label} onChange={e => setFormData({ ...formData, label: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Happy Clients" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Sub-label (Optional)</label>
                                <input type="text" value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. across India" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Icon Name (Lucide)</label>
                                <input required type="text" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Users" />
                            </div>
                            <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                                {editingId ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                {editingId ? "Update Counter" : "Add Counter"}
                            </button>
                            {editingId && (
                                <button type="button" onClick={() => { setEditingId(null); setFormData({ target: 0, label: "", suffix: "+", icon: "Users", gradient: "from-blue-500 to-cyan-500", glow: "shadow-blue-500/30", bg: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/20", desc: "" }); }} className="w-full py-2 rounded-lg border border-border hover:bg-accent text-sm font-medium transition-colors">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </motion.form>
                </div>

                <div className="lg:col-span-2">
                    {loading ? (
                        <div className="text-center py-12">Loading counters...</div>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-4">
                            {items.map((item, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={item._id}
                                    className="bg-card border border-border rounded-xl p-5 shadow-sm relative group"
                                >
                                    <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => { setEditingId(item._id); setFormData(item); }} className="p-1.5 hover:text-primary transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={async () => {
                                            if (!confirm("Delete?")) return;
                                            const token = localStorage.getItem("adminToken");
                                            await fetch(`http://localhost:5000/api/counters/${item._id}`, {
                                                method: "DELETE",
                                                headers: { Authorization: `Bearer ${token}` }
                                            });
                                            fetchItems();
                                        }} className="p-1.5 hover:text-destructive transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary">
                                            <Hash className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-display font-bold text-2xl">{item.target}{item.suffix}</h4>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{item.label}</p>
                                        </div>
                                    </div>
                                    {item.desc && <p className="text-xs text-muted-foreground mt-3 italic pr-4">"{item.desc}"</p>}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
