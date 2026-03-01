"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    CheckCircle2, Target, Eye, Heart, ArrowRight, Sparkles,
    Award, Users, Clock, Zap, Globe, Headphones, Star
} from "lucide-react";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import Link from "next/link";
import Image from "next/image";

const iconMap: any = {
    CheckCircle2, Target, Eye, Heart, Award, Users, Zap, Globe, Headphones, Star
};

const whyUsFallback = [
    { icon: Award, text: "8+ years of industry experience", color: "text-violet-500", bg: "bg-violet-50" },
    { icon: Users, text: "500+ satisfied corporate clients", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Zap, text: "State-of-the-art printing technology", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: CheckCircle2, text: "Competitive pricing with bulk discounts", color: "text-emerald-500", bg: "bg-emerald-50" },
    { icon: Globe, text: "Pan-India delivery network", color: "text-cyan-500", bg: "bg-cyan-50" },
    { icon: Headphones, text: "Dedicated 24/7 customer support", color: "text-rose-500", bg: "bg-rose-50" },
];

const mvvFallback = [
    {
        icon: Target,
        title: "Our Mission",
        desc: "To provide premium branding solutions that help businesses create lasting impressions through quality merchandise.",
        gradient: "from-primary to-blue-600",
    },
    {
        icon: Eye,
        title: "Our Vision",
        desc: "To become India's most trusted corporate gifting partner, known for innovation, quality, and reliability.",
        gradient: "from-secondary to-orange-500",
    },
    {
        icon: Heart,
        title: "Our Values",
        desc: "Quality craftsmanship, on-time delivery, customer satisfaction, and sustainable business practices.",
        gradient: "from-rose-500 to-pink-600",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function AboutClient() {
    const [content, setContent] = useState<any>(null);
    const [cta, setCta] = useState<any>(null);

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:5000/api/about").then(res => res.json()),
            fetch("http://localhost:5000/api/cta?page=about").then(res => res.json())
        ]).then(([aboutData, ctaData]) => {
            if (aboutData?.story) setContent(aboutData);
            if (ctaData?.title) setCta(ctaData);
        }).catch(err => console.error("About fetch error:", err));
    }, []);

    const displayStoryTitle = content?.story?.title || "From a Small Shop to Telangana's Leaders";
    const displayStoryText = content?.story?.text || "Founded in 2016, A&A Pixel & Crafts started as a small printing shop in Hyderabad. Today, we are one of the leading corporate gifting and branding solutions providers in Telangana, serving 500+ clients across India.";
    const displayStoryImage = content?.story?.imageUrl || hero2.src;

    const displayBannerTitle = content?.banner?.title || "About A&A Pixel";
    const displayBannerSubtitle = content?.banner?.subtitle || "Learn about our journey, mission, and what makes us your ideal branding & corporate gifting partner.";
    const displayBannerImage = content?.banner?.imageUrl;

    const displayWhyUsTitle = content?.whyUs?.title || "Why Choose A&A Pixel?";
    const displayWhyUsText = content?.whyUs?.text || "";
    const displayWhyUsImage = content?.whyUs?.imageUrl || hero3.src;

    const displayDrivesUs = content?.whatDrivesUs?.length > 0 ? content.whatDrivesUs : mvvFallback;

    const stats = [
        { value: content?.yearsEx || "8+", label: "Years" },
        { value: "500+", label: "Clients" },
        { value: "2016", label: "Founded" },
        { value: "15%", label: "Bulk Discount" },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* ── Hero Banner ── */}
            <section className="relative pt-28 pb-24 overflow-hidden bg-gradient-to-br from-slate-900 via-primary/90 to-slate-900">
                {displayBannerImage && (
                    <div className="absolute inset-0 opacity-20 relative">
                        <Image src={displayBannerImage} alt="Banner" fill className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-secondary blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-primary blur-[80px]" />
                </div>
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: "48px 48px",
                    }}
                />

                <div className="container-main px-4 sm:px-6 lg:px-8 relative text-center">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                            <Sparkles className="w-3.5 h-3.5 text-secondary" />
                            <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">Who We Are</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-5 leading-[1.05]">
                            {displayBannerTitle.includes("A&A Pixel") ? (
                                <>
                                    {displayBannerTitle.split("A&A Pixel")[0]}
                                    <span className="bg-gradient-to-r from-secondary to-orange-400 bg-clip-text text-transparent">A&A Pixel</span>
                                    {displayBannerTitle.split("A&A Pixel")[1]}
                                </>
                            ) : displayBannerTitle}
                        </h1>
                        <p className="text-white/60 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                            {displayBannerSubtitle}
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap justify-center gap-3 mt-10"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {(content?.banner?.stats?.length > 0 ? content.banner.stats : [
                            { label: "Years", icon: content?.yearsEx || "8+" },
                            { label: "Clients", icon: "500+" },
                            { label: "Founded", icon: "2016" },
                            { label: "Bulk Discount", icon: "15%" },
                        ]).map((s: any) => (
                            <div key={s.label} className="flex flex-col items-center px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                                <span className="text-white font-display font-bold text-2xl leading-none">{s.icon}</span>
                                <span className="text-white/50 text-xs mt-0.5">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-12 bg-background" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
            </section>

            {/* ── Our Story ── */}
            <section className="section-padding bg-background">
                <div className="container-main px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-square md:aspect-auto md:h-full min-h-[300px]">
                                <Image src={displayStoryImage} alt="Our facility" fill className="object-cover" />
                            </div>
                            <div className="absolute -bottom-5 -right-5 bg-card border border-border rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-orange-500 flex items-center justify-center flex-shrink-0">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-display font-bold text-lg leading-none">{content?.yearsEx || "8+"} Years</div>
                                    <div className="text-muted-foreground text-xs">of Excellence</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-5">
                                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                                <span className="text-secondary font-semibold text-xs uppercase tracking-widest">Our Story</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-5 leading-tight">
                                {displayStoryTitle}
                            </h2>
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                                {displayStoryText}
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-primary/40 transition-all duration-200"
                            >
                                Get in Touch <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── What Drives Us ── */}
            <section className="section-padding bg-muted/30 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                }} />
                <div className="container-main px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold">
                            What Drives{" "}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Us</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                    >
                        {displayDrivesUs.map((item: any, i: number) => {
                            const Icon = (typeof item.icon === 'string') ? (iconMap[item.icon] || Target) : item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="group relative overflow-hidden rounded-2xl bg-card border border-border/60 p-7 hover:border-transparent hover:shadow-xl transition-all duration-300"
                                >
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none`} />

                                    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                                        <Icon className="w-7 h-7 text-white" strokeWidth={1.7} />
                                    </div>
                                    <h3 className="relative font-display font-bold text-xl mb-3">{item.title}</h3>
                                    <p className="relative text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ── Why Choose Us ── */}
            <section className="section-padding bg-background">
                <div className="container-main px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                <span className="text-primary font-semibold text-xs uppercase tracking-widest">Why Us</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 leading-tight">
                                {displayWhyUsTitle.includes("A&A Pixel") ? (
                                    <>
                                        {displayWhyUsTitle.split("A&A Pixel")[0]}
                                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">A&A Pixel?</span>
                                        {displayWhyUsTitle.split("A&A Pixel?")[1]}
                                    </>
                                ) : displayWhyUsTitle}
                            </h2>
                            {displayWhyUsText && <p className="text-muted-foreground mb-6 leading-relaxed">{displayWhyUsText}</p>}

                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {(content?.values?.length > 0 ? content.values : whyUsFallback).map((item: any, i: number) => {
                                    const Icon = typeof item.icon === 'string' ? (iconMap[item.icon] || CheckCircle2) : (item.icon || CheckCircle2);
                                    const color = item.color || "text-primary";
                                    const bg = item.bg || "bg-primary/10";
                                    const text = item.title || item.text;
                                    return (
                                        <motion.div
                                            key={i}
                                            variants={itemVariants}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-200"
                                        >
                                            <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                                                <Icon className={`w-4.5 h-4.5 ${color}`} strokeWidth={2} />
                                            </div>
                                            <span className="font-medium text-sm leading-tight">{text}</span>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.92 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-square md:aspect-auto md:h-full min-h-[300px]">
                                <Image src={displayWhyUsImage} alt="Our products" fill className="object-cover" />
                            </div>
                            <div className="absolute -top-5 -left-5 bg-card border border-border rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-display font-bold text-lg leading-none">500+</div>
                                    <div className="text-muted-foreground text-xs">Happy Clients</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Bottom CTA ── */}
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
        </div>
    );
}

