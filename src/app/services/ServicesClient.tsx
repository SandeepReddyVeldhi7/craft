"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Shirt, BookOpen, Coffee, ShoppingBag, PenTool, Key, Umbrella, Gift,
    CreditCard, Printer, Flag, Sticker, ArrowRight, CheckCircle2, Sparkles,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, any> = {
    Shirt, BookOpen, Coffee, ShoppingBag, PenTool, Key, Umbrella, Gift,
    CreditCard, Printer, Flag, Sticker,
};

const allServicesFallback = [
    {
        icon: "Gift",
        title: "Corporate Gift Kits",
        desc: "Complete corporate welcome kits, joining kits, and festival gift hampers that leave a lasting impression.",
        features: ["Welcome Kits", "Joining Kits", "Festival Hampers", "Award Kits"],
        color: "from-violet-500 to-purple-600",
        featured: true,
    },
    {
        icon: "Shirt",
        title: "T-Shirt Printing",
        desc: "Custom printed and embroidered t-shirts, polo shirts, and corporate wear with your logo and branding.",
        features: ["Screen Printing", "DTF Printing", "Embroidery", "Sublimation"],
        color: "from-blue-500 to-cyan-500",
    },
    {
        icon: "Coffee",
        title: "Mugs & Drinkware",
        desc: "Personalized mugs, bottles, sippers, and tumblers for corporate gifting and events.",
        features: ["Ceramic Mugs", "Steel Bottles", "Sippers", "Tumblers"],
        color: "from-orange-500 to-amber-500",
    },
    {
        icon: "ShoppingBag",
        title: "Bags & Pouches",
        desc: "Custom printed tote bags, backpacks, laptop bags, and pouches with your brand identity.",
        features: ["Tote Bags", "Backpacks", "Laptop Bags", "Jute Bags"],
        color: "from-emerald-500 to-teal-500",
    },
    {
        icon: "BookOpen",
        title: "Diaries & Notebooks",
        desc: "Premium branded diaries, planners, and notebooks for corporate stationery needs.",
        features: ["Leather Diaries", "Spiral Notebooks", "Planners", "Notepads"],
        color: "from-rose-500 to-pink-500",
    },
    {
        icon: "PenTool",
        title: "Pens & Stationery",
        desc: "Branded pens, pencils, and desk accessories for promotional giveaways.",
        features: ["Metal Pens", "Plastic Pens", "Pen Sets", "Desk Items"],
        color: "from-sky-500 to-indigo-500",
    },
    {
        icon: "Key",
        title: "Keychains & Accessories",
        desc: "Custom metal, acrylic, and leather keychains with logo engraving.",
        features: ["Metal", "Acrylic", "Leather", "PVC"],
        color: "from-yellow-500 to-orange-500",
    },
    {
        icon: "Umbrella",
        title: "Umbrellas",
        desc: "Large format printed umbrellas with your brand logo for promotions and events.",
        features: ["Golf Umbrellas", "Folding", "Straight", "Patio"],
        color: "from-cyan-500 to-blue-500",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as any } },
};

export default function ServicesClient({ services }: { services?: any[] }) {
    const [cta, setCta] = useState<any>(null);
    const [banner, setBanner] = useState<any>(null);

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:5000/api/cta?page=services").then(res => res.json()),
            fetch("http://localhost:5000/api/services/banner").then(res => res.json())
        ]).then(([ctaData, bannerData]) => {
            if (ctaData && ctaData.title) setCta(ctaData);
            if (bannerData) setBanner(bannerData);
        }).catch(err => console.error(err));
    }, []);

    const displayServices =
        services && services.length > 0 ? services : allServicesFallback;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Banner */}
            <section className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-primary/90 to-slate-900">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-secondary blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-primary blur-[80px]" />
                </div>
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: "48px 48px",
                    }}
                />

                <div className="container-main px-4 sm:px-6 lg:px-8 relative text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                            <Sparkles className="w-3.5 h-3.5 text-secondary" />
                            <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">
                                A&A Pixel & Crafts
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-5 leading-[1.05]">
                            {banner?.title ? (
                                banner.title.includes("Services") ? (
                                    <>
                                        {banner.title.split("Services")[0]}
                                        <span className="bg-gradient-to-r from-secondary to-orange-400 bg-clip-text text-transparent">Services</span>
                                        {banner.title.split("Services")[1]}
                                    </>
                                ) : banner.title
                            ) : "Our Services"}
                        </h1>
                        <p className="text-white/60 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                            {banner?.subtitle || "Complete range of premium printing, branding & corporate gifting solutions — pixel perfect, every time."}
                        </p>
                    </motion.div>

                    {/* Stat pills */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 mt-10"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {(banner?.stats?.length > 0 ? banner.stats : [
                            { label: "8+ Services", icon: "🎯" },
                            { label: "500+ Clients", icon: "🤝" },
                            { label: "15% Bulk Discount", icon: "💸" },
                            { label: "Fast Delivery", icon: "⚡" },
                        ]).map((stat: any) => (
                            <span
                                key={stat.label}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white text-sm font-medium"
                            >
                                <span>{stat.icon}</span>
                                {stat.label}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding">
                <div className="container-main px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {displayServices.map((service) => {
                            const Icon = iconMap[service.icon] || Gift;
                            const gradient = service.color || "from-primary to-secondary";
                            const isFeatured = service.featured;

                            return (
                                <motion.article
                                    key={service.title}
                                    variants={cardVariants}
                                    className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card flex flex-col hover:border-transparent hover:shadow-2xl transition-all duration-400 ${isFeatured ? "md:col-span-2 xl:col-span-1" : ""
                                        }`}
                                >
                                    {/* Top gradient bar */}
                                    <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />

                                    {/* Hover gradient fill */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none`}
                                    />

                                    <div className="p-7 flex flex-col flex-1 gap-5">
                                        {/* Icon + badge */}
                                        <div className="flex items-start justify-between">
                                            <div
                                                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
                                            >
                                                <Icon className="w-7 h-7 text-white" strokeWidth={1.7} />
                                            </div>
                                            {isFeatured && (
                                                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold border border-secondary/20">
                                                    ⭐ Popular
                                                </span>
                                            )}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1">
                                            <h2 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-200">
                                                {service.title}
                                            </h2>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                                        </div>

                                        {/* Feature tags */}
                                        {service.features && service.features.length > 0 && (
                                            <ul className="flex flex-wrap gap-2">
                                                {service.features.map((f: string) => (
                                                    <li
                                                        key={f}
                                                        className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium"
                                                    >
                                                        <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* CTA */}
                                        <Link
                                            href="/contact"
                                            className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200"
                                        >
                                            Get a Quote <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </motion.div>

                    {/* Bottom CTA banner */}
                    <motion.div
                        className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary p-10 text-center"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: `radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 50%, white 1px, transparent 1px)`,
                            backgroundSize: "32px 32px",
                        }} />
                        <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-3 relative">
                            {cta?.title || "Need something custom?"}
                        </h3>
                        <p className="text-white/70 mb-6 relative max-w-md mx-auto text-sm">
                            {cta?.desc || "Tell us what you need and we'll craft the perfect solution for your brand."}
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center relative">
                            <a
                                href={cta?.secondaryBtnLink || "https://wa.me/919100760587"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
                            >
                                {cta?.secondaryBtnText || "WhatsApp Us"}
                            </a>
                            <Link
                                href={cta?.primaryBtnLink || "/contact"}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 border border-white/30 text-white font-semibold text-sm hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                {cta?.primaryBtnText || "Contact Form"} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
