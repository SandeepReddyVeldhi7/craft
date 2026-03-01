"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Loader2, ArrowLeft, Target } from "lucide-react";
import Link from "next/link";

export default function AboutDrivesAdmin() {
    const [drivers, setDrivers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/about")
            .then(res => res.json())
            .then(data => {
                if (data && data.whatDrivesUs) setDrivers(data.whatDrivesUs);
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
                body: JSON.stringify({ ...currentData, whatDrivesUs: drivers })
            });
            if (res.ok) alert("Items updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update items.");
        }
        setLoading(false);
    };

    const addDriver = () => {
        setDrivers([...drivers, { icon: "Target", title: "", desc: "", gradient: "from-primary to-blue-600" }]);
    };

    const removeDriver = (index: number) => {
        const newDrivers = [...drivers];
        newDrivers.splice(index, 1);
        setDrivers(newDrivers);
    };

    const updateDriver = (index: number, field: string, value: string) => {
        const newDrivers = [...drivers];
        newDrivers[index][field] = value;
        setDrivers(newDrivers);
    };

    if (fetching) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link href="/admin" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary mb-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                    <h1 className="text-3xl font-display font-bold">What Drives Us</h1>
                </div>
                <div className="flex gap-4">
                    <button onClick={addDriver} className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border bg-card font-semibold hover:bg-accent transition-colors">
                        <Plus className="w-4 h-4" /> Add Item
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-primary/20"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="grid gap-6">
                {drivers.map((d, i) => (
                    <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-sm relative group animate-in fade-in slide-in-from-bottom-2">
                        <button onClick={() => removeDriver(i)} className="absolute top-4 right-4 p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Title</label>
                                    <input
                                        type="text"
                                        value={d.title}
                                        onChange={e => updateDriver(i, 'title', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none"
                                        placeholder="e.g. Our Mission"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Icon (Lucide Name)</label>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={d.icon}
                                            onChange={e => updateDriver(i, 'icon', e.target.value)}
                                            className="flex-1 px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none"
                                            placeholder="Target, Eye, Heart..."
                                        />
                                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <Target className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Description</label>
                                    <textarea
                                        value={d.desc}
                                        onChange={e => updateDriver(i, 'desc', e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Gradient Style</label>
                                    <input
                                        type="text"
                                        value={d.gradient}
                                        onChange={e => updateDriver(i, 'gradient', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none"
                                        placeholder="from-primary to-blue-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {drivers.length === 0 && (
                    <div className="text-center py-20 bg-muted/40 rounded-3xl border-2 border-dashed border-border">
                        <p className="text-muted-foreground">No items added yet. Click "Add Item" to start.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
