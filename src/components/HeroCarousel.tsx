"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";

const slides = [
  {
    image: hero1,
    badge: "🎁 Corporate Gifting",
    title: "All Your Gifting",
    titleAccent: "Needs, One Place",
    subtitle:
      "Premium branded merchandise, joining kits, and gifting solutions crafted to make your brand unforgettable.",
    cta: "Explore Products",
    ctaHref: "#services",
    tag: "Up to 15% off on bulk orders",
    accentColor: "from-blue-600 to-indigo-600",
  },
  {
    image: hero2,
    badge: "🖨️ Premium Printing",
    title: "State-of-the-Art",
    titleAccent: "Print Technology",
    subtitle:
      "Digital & offset printing for banners, brochures, packaging, and everything in between — pixel perfect, every time.",
    cta: "View Services",
    ctaHref: "/services",
    tag: "Same day delivery available",
    accentColor: "from-orange-500 to-red-500",
  },
  {
    image: hero3,
    badge: "✨ Custom Branding",
    title: "Elevate Your",
    titleAccent: "Brand Identity",
    subtitle:
      "Customized joining kits, company merchandise, and branding collateral with an exclusive range of premium items.",
    cta: "View Portfolio",
    ctaHref: "/portfolio",
    tag: "100+ brand partners",
    accentColor: "from-emerald-500 to-teal-600",
  },
];

const AUTOPLAY_INTERVAL = 5500;

const HeroCarousel = () => {
  const [slidesData, setSlidesData] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("http://localhost:5000/api/hero")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setSlidesData(data);
        else setSlidesData(slides);
      })
      .catch(() => setSlidesData(slides));
  }, []);

  const totalSlides = slidesData.length || slides.length;

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // Autoplay + progress bar
  useEffect(() => {
    if (isPaused) return;
    const interval = 50; // ms tick
    const step = (interval / AUTOPLAY_INTERVAL) * 100;
    const ticker = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setCurrent((c) => (c + 1) % totalSlides);
          return 0;
        }
        return p + step;
      });
    }, interval);
    return () => clearInterval(ticker);
  }, [isPaused]);

  if (!mounted) return <div className="h-screen w-full bg-slate-950" />;

  return (
    <section
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={(slidesData.length > 0 && slidesData[current]?.imageUrl) ? slidesData[current].imageUrl : slides[current]?.image}
            alt={(slidesData.length > 0 && slidesData[current]?.title) ? slidesData[current].title : slides[current]?.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Rich gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-secondary/20 blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-main px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2"
                >
                  <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                    {slidesData.length ? slidesData[current]?.badge : slides[current]?.badge}
                  </span>
                  {!slidesData.length && (
                    <span className="px-3 py-1.5 rounded-full bg-secondary/90 text-white text-xs font-semibold">
                      {slides[current]?.tag}
                    </span>
                  )}
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] text-white"
                >
                  {slidesData.length ? slidesData[current]?.title : slides[current]?.title}{" "}
                  <span
                    className={`bg-gradient-to-r ${slidesData.length ? (slidesData[current]?.accentColor || "from-secondary to-orange-500") : slides[current]?.accentColor} bg-clip-text text-transparent`}
                  >
                    {slidesData.length ? slidesData[current]?.titleAccent : slides[current]?.titleAccent}
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="text-base md:text-lg text-white/75 leading-relaxed max-w-lg"
                >
                  {slidesData.length ? slidesData[current]?.subtitle : slides[current]?.subtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <Link
                    href={
                      slidesData.length && slidesData[current]?.ctaLink
                        ? slidesData[current].ctaLink
                        : slides[current]?.ctaHref || "/"
                    }
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-secondary to-orange-600 text-white font-bold text-lg shadow-2xl shadow-secondary/40 hover:shadow-secondary/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[20deg]" />
                    {slidesData.length ? slidesData[current]?.ctaText : slides[current]?.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>

                  {/* Secondary Button - Always fallback to WhatsApp if not specified */}
                  <a
                    href={slidesData.length && slidesData[current]?.secondaryCtaLink ? slidesData[current]?.secondaryCtaLink : "https://wa.me/919100760587"}
                    target={(!slidesData.length || !slidesData[current]?.secondaryCtaLink) ? "_blank" : "_self"}
                    rel={(!slidesData.length || !slidesData[current]?.secondaryCtaLink) ? "noopener noreferrer" : ""}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 text-white font-bold text-lg hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[20deg]" />
                    {slidesData.length && slidesData[current]?.secondaryCtaText ? (
                      slidesData[current]?.secondaryCtaText
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 text-[#25D366]" />
                        WhatsApp Us
                      </>
                    )}
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide Controls — bottom right */}
      <div className="absolute bottom-8 right-4 sm:right-8 z-20 flex flex-col items-end gap-4">
        {/* Prev / Next arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 hover:scale-110 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 hover:scale-110 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide indicators with progress */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setProgress(0); }}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === current ? 40 : 16 }}
            >
              <div className="absolute inset-0 bg-white/30 rounded-full" />
              {i === current && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                  style={{ width: `${progress}%` }}
                />
              )}
              {i !== current && (
                <div className="absolute inset-0 bg-white/30 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-white/50 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default HeroCarousel;
