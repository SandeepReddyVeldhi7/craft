"use client";

import HeroCarousel from "../components/HeroCarousel";
import Marquee from "../components/Marquee";
import ServicesSection from "../components/ServicesSection";
import CountersSection from "../components/CountersSection";
import GallerySection from "../components/GallerySection";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Sparkles, Phone, MessageCircle, Star, Shield, Zap, Clock, Package, Gift, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import hero3 from "@/assets/hero-3.png";

const AboutPreview = () => {
    const [data, setData] = useState<any>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        fetch("http://localhost:5000/api/home-about")
            .then(res => res.json())
            .then(data => {
                if (data) setData(data);
            })
            .catch(err => console.error(err));
    }, []);

    const storyText = data?.text || "A&A Pixel & Crafts is your trusted partner for corporate gifting, printing, and branding solutions. We deliver premium quality products that leave lasting impressions.";
    const previewTitle = data?.previewTitle || "Crafting Excellence Since 2016";
    const yearsEx = data?.yearsEx || "8+";
    const imageUrl = data?.imageUrl || hero3.src;
    const dynamicCheckItems = data?.checkItems?.length ? data.checkItems : [
        { icon: "CheckCircle2", text: "Premium quality materials", color: "text-emerald-500", bg: "bg-emerald-50" },
        { icon: "Clock", text: "On-time delivery, guaranteed", color: "text-blue-500", bg: "bg-blue-50" },
        { icon: "Sparkles", text: "Custom designs & branding", color: "text-violet-500", bg: "bg-violet-50" },
        { icon: "Zap", text: "Bulk order specialists", color: "text-orange-500", bg: "bg-orange-50" },
    ];

    const iconMap: any = {
        CheckCircle2, Clock, Sparkles, Zap, Star, Shield, Phone, Package, Gift, Truck
    };

    return (
        <section className="section-padding bg-background" ref={ref}>
            <div className="container-main px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-center">
                {/* Image with floating badge */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] relative">
                        <Image
                            src={imageUrl}
                            alt="About us"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    {/* Floating year badge */}
                    <div className="absolute -bottom-5 -right-5 bg-gradient-to-br from-secondary to-orange-500 rounded-2xl px-5 py-4 shadow-xl shadow-secondary/30 text-center">
                        <span className="text-3xl font-display font-bold text-white block leading-none">{yearsEx}</span>
                        <span className="text-white/80 text-xs font-medium">Years</span>
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-5">
                        <Sparkles className="w-3.5 h-3.5 text-secondary" />
                        <span className="text-secondary font-semibold text-xs uppercase tracking-widest">About Us</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-5 leading-tight">
                        {previewTitle.split("Excellence")[0]}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Excellence</span>
                        {previewTitle.split("Excellence")[1]}
                    </h2>
                    <p className="text-muted-foreground mb-7 leading-relaxed line-clamp-4">
                        {storyText}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {dynamicCheckItems.map((item: any, idx: number) => {
                            const Icon = iconMap[item.icon] || CheckCircle2;
                            return (
                                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-transparent dark:border-white/5">
                                    <div className={`w-8 h-8 rounded-lg ${item.bg || "bg-emerald-50 dark:bg-emerald-500/10"} flex items-center justify-center flex-shrink-0`}>
                                        <Icon className={`w-4 h-4 ${item.color || "text-emerald-500 dark:text-emerald-400"}`} strokeWidth={2} />
                                    </div>
                                    <span className="text-sm font-medium leading-tight">{item.text}</span>
                                </div>
                            );
                        })}
                    </div>
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-primary/40 transition-all duration-200"
                    >
                        Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

const trustChips = [
    { icon: Shield, label: "Quality Guaranteed" },
    { icon: Clock, label: "Fast Turnaround" },
    { icon: Star, label: "500+ Happy Clients" },
    { icon: Zap, label: "Bulk Discounts" },
];

const CTASection = () => {
    const [cta, setCta] = useState<any>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        fetch("http://localhost:5000/api/cta?page=home")
            .then(res => res.json())
            .then(data => {
                if (data && data.title) setCta(data);
            })
            .catch(err => console.error(err));
    }, []);

    const title = cta?.title || "Ready to Brand Your Business?";
    const subtitle = cta?.subtitle || "Let's Work Together";
    const desc = cta?.desc || "Get in touch today for a free quote. We'll craft stunning branded merchandise that makes your brand unforgettable.";
    const primaryBtnText = cta?.primaryBtnText || "Get a Free Quote";
    const primaryBtnLink = cta?.primaryBtnLink || "/contact";
    const secondaryBtnText = cta?.secondaryBtnText || "WhatsApp Us";
    const secondaryBtnLink = cta?.secondaryBtnLink || "https://wa.me/919100760587";

    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-slate-900" ref={ref}>
            {/* Ambient glow blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/25 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-secondary/25 blur-[100px] pointer-events-none" />
            {/* Dot grid */}
            <div className="absolute inset-0 opacity-[0.06]" style={{
                backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
                backgroundSize: "36px 36px",
            }} />

            <div className="container-main px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    className="text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Label */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-7">
                        <Sparkles className="w-3.5 h-3.5 text-secondary" />
                        <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">{subtitle}</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-5 leading-[1.05]">
                        {title.split("Your Business?")[0]}
                        <span className="bg-gradient-to-r from-secondary to-orange-400 bg-clip-text text-transparent">
                            {title.includes("Your Business?") ? "Your Business?" : ""}
                        </span>
                    </h2>
                    <p className="text-white/55 text-base md:text-lg max-w-xl mx-auto mb-9 leading-relaxed">
                        {desc}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex gap-3 justify-center flex-wrap mb-10">
                        <Link
                            href={primaryBtnLink}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-secondary to-orange-500 text-white font-bold text-sm shadow-2xl shadow-secondary/30 hover:-translate-y-1 hover:shadow-secondary/50 transition-all duration-200"
                        >
                            <Phone className="w-4 h-4" /> {primaryBtnText}
                        </Link>
                        <a
                            href={secondaryBtnLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/25 text-white font-bold text-sm hover:bg-white/20 hover:-translate-y-1 transition-all duration-200"
                        >
                            <MessageCircle className="w-4 h-4" /> {secondaryBtnText}
                        </a>
                    </div>

                    {/* Trust chips */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {trustChips.map(({ icon: Icon, label }) => (
                            <div key={label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-white/60 text-xs font-medium">
                                <Icon className="w-3.5 h-3.5 text-secondary" />
                                {label}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default function HomeClient() {
    const [services, setServices] = useState<any[]>([]);
    const [servicesConfig, setServicesConfig] = useState<any>(null);
    const [portfolio, setPortfolio] = useState<any[]>([]);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [s, cfg, p] = await Promise.all([
                    fetch("http://localhost:5000/api/services").then(res => res.json()),
                    fetch("http://localhost:5000/api/home-services").then(res => res.json()),
                    fetch("http://localhost:5000/api/portfolio").then(res => res.json()),
                ]);
                if (Array.isArray(s)) setServices(s);
                if (cfg) setServicesConfig(cfg);
                if (Array.isArray(p)) setPortfolio(p);
            } catch (err) {
                console.error("Home fetch error:", err);
            }
        };
        fetchAll();
    }, []);

    return (
        <>
            <HeroCarousel />
            <Marquee />
            <AboutPreview />
            <ServicesSection
                dynamicServices={services}
                title={servicesConfig?.title}
                description={servicesConfig?.description}
            />
            <CountersSection />
            <GallerySection dynamicItems={portfolio} />
            <CTASection />
        </>
    );
}
