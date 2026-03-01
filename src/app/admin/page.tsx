"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Briefcase, PlusSquare, ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        portfolio: 0,
        services: 0,
        hero: 0,
        counters: 0,
        marquee: 0
    });

    useEffect(() => {
        // Fetch stats  
        const endpoints = [
            "http://localhost:5000/api/portfolio",
            "http://localhost:5000/api/services",
            "http://localhost:5000/api/hero",
            "http://localhost:5000/api/counters",
            "http://localhost:5000/api/marquee"
        ];

        Promise.all(endpoints.map(url => fetch(url).then(res => res.json())))
            .then(([portfolio, services, hero, counters, marquee]) => {
                setStats({
                    portfolio: portfolio.length || 0,
                    services: services.length || 0,
                    hero: hero.length || 0,
                    counters: counters.length || 0,
                    marquee: marquee.length || 0
                });
            }).catch(console.error);
    }, []);

    const dashboardCards = [
        { label: "Hero Slides", count: stats.hero, href: "/admin/hero", icon: PlusSquare, color: "bg-blue-500/10 text-blue-600" },
        { label: "Marquee Items", count: stats.marquee, href: "/admin/marquee", icon: LayoutDashboard, color: "bg-orange-500/10 text-orange-600" },
        { label: "About Us", count: "Global", href: "/admin/about", icon: LayoutDashboard, color: "bg-emerald-500/10 text-emerald-600" },
        { label: "What We Offer", count: stats.services, href: "/admin/services", icon: PlusSquare, color: "bg-secondary/10 text-secondary" },
        { label: "Our Numbers Speak", count: stats.counters, href: "/admin/counters", icon: LayoutDashboard, color: "bg-violet-500/10 text-violet-600" },
        { label: "Project Gallery", count: stats.portfolio, href: "/admin/portfolio", icon: Briefcase, color: "bg-primary/10 text-primary" },
        { label: "Let's Work Together", count: "Global", href: "/admin/cta", icon: LayoutDashboard, color: "bg-amber-500/10 text-amber-600" },
        { label: "Header Settings", count: "Global", href: "/admin/header", icon: LayoutDashboard, color: "bg-cyan-500/10 text-cyan-600" },
        { label: "Footer Settings", count: "Global", href: "/admin/footer", icon: LayoutDashboard, color: "bg-indigo-500/10 text-indigo-600" },
        { label: "Contact Info", count: "Global", href: "/admin/contact", icon: LayoutDashboard, color: "bg-rose-500/10 text-rose-600" },
        { label: "Footer Settings", count: "Global", href: "/admin/footer", icon: LayoutDashboard, color: "bg-indigo-500/10 text-indigo-600" },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-3xl font-display font-bold mb-2 pr-4">Dashboard Overview</h1>
                <p className="text-muted-foreground">Manage your website content dynamically.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {dashboardCards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${card.color}`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-1">{card.count}</h3>
                        <p className="text-muted-foreground mb-6">{card.label}</p>
                        <Link href={card.href} className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
                            Manage <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
