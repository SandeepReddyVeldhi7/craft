"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Filter, Sparkles, Award, Users, Package, Star, Phone, MessageCircle, ArrowRight } from "lucide-react";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import Link from "next/link";
import Image from "next/image";

const iconMap: any = {
    Filter, Sparkles, Award, Users, Package, Star, Phone, MessageCircle, ArrowRight
};

const categories = ["All", "T-Shirts", "Mugs", "Bags", "Kits"];

const categoryColors: Record<string, string> = {
    Kits: "from-violet-500 to-purple-600",
    "T-Shirts": "from-blue-500 to-cyan-500",
    Mugs: "from-orange-500 to-amber-500",
    Bags: "from-emerald-500 to-teal-500",
};

const categoryStats: Record<string, string> = {
    All: "18+ Projects",
    "T-Shirts": "30k+ Units",
    Mugs: "15k+ Pieces",
    Bags: "20k+ Bags",
    Kits: "500+ Kits",
};

const defaultItems = [
    { src: hero1, category: "Kits", title: "Corporate Welcome Kit", desc: "Premium onboarding kits for Fortune 500 companies." },
    { src: hero2, category: "T-Shirts", title: "Branded Printing Setup", desc: "High-resolution screen & DTF prints for event teams." },
    { src: hero3, category: "Kits", title: "Premium Gift Collection", desc: "Festival hampers with curated branded merchandise." },
    { src: hero1, category: "Mugs", title: "Custom Mugs & Bottles", desc: "Ceramic & steel drinkware with full-wrap printing." },
    { src: hero2, category: "Bags", title: "Logo Printed Bags", desc: "Tote & laptop bags for employee welcome programs." },
    { src: hero3, category: "T-Shirts", title: "Team Wear Collection", desc: "Matching polos & t-shirts for corporate sports day." },
    { src: hero1, category: "Bags", title: "Eco Jute Totes", desc: "Sustainable branded bags for CSR initiatives." },
    { src: hero2, category: "Kits", title: "Anniversary Gift Hampers", desc: "Curated kits for employee milestone celebrations." },
    { src: hero3, category: "Mugs", title: "Sippers & Tumblers", desc: "Insulated steel bottles with laser-engraved logos." },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] as any } },
};

export default function PortfolioClient({ items }: { items?: any[] }) {
    const [filter, setFilter] = useState("All");
    const [lightbox, setLightbox] = useState<number | null>(null);
    const [banner, setBanner] = useState<any>(null);
    const [cta, setCta] = useState<any>(null);

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:5000/api/portfolio/banner").then(res => res.json()),
            fetch("http://localhost:5000/api/cta?page=portfolio").then(res => res.json())
        ]).then(([bannerData, ctaData]) => {
            if (bannerData) setBanner(bannerData);
            if (ctaData?.title) setCta(ctaData);
        }).catch(err => console.error(err));
    }, []);

    const displayItems =
        items && items.length > 0
            ? items.map((item) => ({ ...item, src: item.imageUrl }))
            : defaultItems;

    const categories = ["All", ...Array.from(new Set(displayItems.map(i => i.category)))];

    const filtered =
        filter === "All" ? displayItems : displayItems.filter((i) => i.category === filter);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Banner */}
            <section className="relative pt-28 pb-24 overflow-hidden bg-gradient-to-br from-slate-900 via-primary/90 to-slate-900">
                {banner?.imageUrl && (
                    <div className="absolute inset-0 opacity-20 relative">
                        <Image src={banner.imageUrl} alt="Banner" fill className="object-cover" />
                    </div>
                )}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-secondary blur-[120px]" />
                    <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-primary blur-[80px]" />
                </div>
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
                                Our Portfolio
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-5 leading-[1.05]">
                            {banner?.title ? (
                                banner.title.includes("Gallery") ? (
                                    <>
                                        {banner.title.split("Gallery")[0]}
                                        <span className="bg-gradient-to-r from-secondary to-orange-400 bg-clip-text text-transparent">Gallery</span>
                                        {banner.title.split("Gallery")[1]}
                                    </>
                                ) : banner.title
                            ) : (
                                <>Project <span className="bg-gradient-to-r from-secondary to-orange-400 bg-clip-text text-transparent">Gallery</span></>
                            )}
                        </h1>
                        <p className="text-white/60 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                            {banner?.subtitle || "Browse through our completed projects — premium branded merchandise that wowed our clients."}
                        </p>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-3 mt-10"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {(banner?.stats?.length > 0 ? banner.stats : [
                            { label: "500+ Clients", icon: "🤝" },
                            { label: "18+ Categories", icon: "🎁" },
                            { label: "100k+ Units Delivered", icon: "📦" },
                            { label: "5★ Rated", icon: "⭐" },
                        ]).map((stat: any) => (
                            <span
                                key={stat.label}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white text-sm font-medium"
                            >
                                {stat.icon} {stat.label}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Wave bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-background" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
            </section>

            {/* Gallery section */}
            <section className="section-padding">
                <div className="container-main px-4 sm:px-6 lg:px-8">
                    {/* Filter tabs */}
                    <motion.div
                        className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium flex-shrink-0">
                            <Filter className="w-4 h-4" /> Filter by:
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${filter === cat
                                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="sm:ml-auto text-muted-foreground text-sm">
                            <span className="font-semibold text-foreground">{filtered.length}</span> projects
                        </div>
                    </motion.div>

                    {/* Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key={filter}
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((item, i) => {
                                const gradient = categoryColors[item.category] || "from-primary to-secondary";
                                return (
                                    <motion.article
                                        key={item.title + i}
                                        layout
                                        variants={cardVariants}
                                        exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2, ease: "easeIn" as any } }}
                                        className="group cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card hover:border-transparent hover:shadow-2xl transition-all duration-300"
                                        onClick={() => setLightbox(i)}
                                    >
                                        {/* Image */}
                                        <div className="relative overflow-hidden aspect-[4/3]">
                                            <Image
                                                src={typeof item.src === "string" ? item.src : (item.src as any).src}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />

                                            {/* Hover overlay */}
                                            <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-300`} />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                                    <ZoomIn className="w-6 h-6 text-white" />
                                                </div>
                                            </div>

                                            {/* Category pill */}
                                            <div className="absolute top-3 left-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${gradient} shadow-md`}>
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card body */}
                                        <div className="p-5">
                                            <h3 className="font-display font-bold text-base mb-1 group-hover:text-primary transition-colors duration-200">
                                                {item.title}
                                            </h3>
                                            {item.desc && (
                                                <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                                            )}
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="section-padding bg-muted/30">
                <div className="container-main px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary p-10 md:p-14 text-center"
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
                            backgroundSize: "32px 32px",
                        }} />
                        <h3 className="relative font-display font-bold text-2xl md:text-4xl text-white mb-3">
                            {cta?.title || "Ready to brand your business?"}
                        </h3>
                        <p className="relative text-white/70 mb-8 max-w-md mx-auto text-sm md:text-base">
                            {cta?.desc || "Let's create memorable branded merchandise together. Get a free quote today."}
                        </p>
                        <div className="relative flex flex-wrap gap-3 justify-center">
                            <a
                                href={cta?.secondaryBtnLink || "https://wa.me/919100760587"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-primary font-semibold text-sm shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200"
                            >
                                {cta?.secondaryBtnText || "WhatsApp Us"}
                            </a>
                            <Link
                                href={cta?.primaryBtnLink || "/contact"}
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/15 border border-white/30 text-white font-semibold text-sm hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                {cta?.primaryBtnText || "Contact Form"} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.88, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.88, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as any }}
                            className="relative max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-[78vh]">
                                <Image
                                    src={
                                        typeof filtered[lightbox]?.src === "string"
                                            ? filtered[lightbox]?.src
                                            : (filtered[lightbox]?.src as any)?.src
                                    }
                                    alt={filtered[lightbox]?.title}
                                    fill
                                    className="rounded-2xl object-contain shadow-2xl"
                                />
                            </div>
                            <div className="mt-4 flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-white font-display font-bold text-lg leading-tight">
                                        {filtered[lightbox]?.title}
                                    </h3>
                                    {filtered[lightbox]?.desc && (
                                        <p className="text-white/60 text-sm mt-1">{filtered[lightbox]?.desc}</p>
                                    )}
                                    <span
                                        className={`inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[filtered[lightbox]?.category] || "from-primary to-secondary"
                                            }`}
                                    >
                                        {filtered[lightbox]?.category}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setLightbox(null)}
                                    className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
