"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Loader2, MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";

export default function ContactAdmin() {
    const [config, setConfig] = useState<any>({
        phone: "+91 9100760587",
        email: "info@aapixelcrafts.com",
        address: "Hyderabad, Telangana, India",
        workingHours: "Mon - Sat: 9:00 AM - 7:00 PM",
        mapUrl: ""
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/contact-config")
            .then(res => res.json())
            .then(data => {
                if (data && data.phone) setConfig(data);
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
            const res = await fetch("http://localhost:5000/api/contact-config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config)
            });
            if (res.ok) alert("Contact info updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update contact info.");
        }
        setLoading(false);
    };

    if (fetching) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link href="/admin" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary mb-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-display font-bold">Contact Settings</h1>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-primary" /> Contact Details
                    </h2>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <input
                            type="text"
                            value={config.phone}
                            onChange={e => setConfig({ ...config, phone: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            value={config.email}
                            onChange={e => setConfig({ ...config, email: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                        />
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" /> Location & Hours
                    </h2>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Physical Address</label>
                        <input
                            type="text"
                            value={config.address}
                            onChange={e => setConfig({ ...config, address: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Working Hours</label>
                        <input
                            type="text"
                            value={config.workingHours}
                            onChange={e => setConfig({ ...config, workingHours: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                        />
                    </div>
                </div>

                <div className="md:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold mb-4">Google Maps Embed URL</h2>
                    <p className="text-xs text-muted-foreground mb-4">
                        Go to Google Maps → Share → Embed a map → Copy the URL inside the src attribute.
                    </p>
                    <textarea
                        value={config.mapUrl}
                        onChange={e => setConfig({ ...config, mapUrl: e.target.value })}
                        rows={3}
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none resize-none text-sm"
                    />
                </div>
            </div>
        </div>
    );
}
