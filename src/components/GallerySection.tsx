"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ArrowRight, Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";

const categories = ["All", "T-Shirts", "Mugs", "Bags", "Kits"];

const categoryColors: Record<string, string> = {
  Kits: "from-violet-500 to-purple-600",
  "T-Shirts": "from-blue-500 to-cyan-500",
  Mugs: "from-orange-500 to-amber-500",
  Bags: "from-emerald-500 to-teal-500",
};

const defaultItems = [
  { src: hero1, category: "Kits", title: "Corporate Welcome Kit" },
  { src: hero2, category: "T-Shirts", title: "Branded Printing Setup" },
  { src: hero3, category: "Kits", title: "Premium Gift Collection" },
  { src: hero1, category: "Mugs", title: "Custom Mugs & Bottles" },
  { src: hero2, category: "Bags", title: "Logo Printed Bags" },
  { src: hero3, category: "T-Shirts", title: "Team Wear Collection" },
];

export default function GallerySection({ dynamicItems }: { dynamicItems?: any[] }) {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const displayItems =
    dynamicItems && dynamicItems.length > 0
      ? dynamicItems.map((item) => ({ ...item, src: item.imageUrl }))
      : defaultItems;

  const filtered =
    filter === "All" ? displayItems : displayItems.filter((i) => i.category === filter);

  return (
    <section id="gallery" className="section-padding bg-background relative overflow-hidden" ref={ref}>
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

      <div className="container-main relative">
        {/* Header row */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Images className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary font-semibold text-xs uppercase tracking-widest">Our Work</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              Project{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Gallery
              </span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-200 self-start md:self-auto"
          >
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          className="flex gap-2 mb-10 flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
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
        </motion.div>

        {/* Masonry-style grid with varied sizes */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((item, i) => {
              const gradient = categoryColors[item.category] || "from-primary to-secondary";
              const isLarge = i === 0 || i === 3; // first and 4th span 2 cols on larger grid
              return (
                <motion.div
                  key={item.title + i}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`group cursor-pointer overflow-hidden rounded-2xl relative ${isLarge ? "col-span-2 md:col-span-1" : ""
                    }`}
                  onClick={() => setLightbox(i)}
                >
                  <div className={`relative overflow-hidden ${isLarge ? "aspect-[16/9] md:aspect-[4/3]" : "aspect-[4/3]"}`}>
                    <Image
                      src={typeof item.src === "string" ? item.src : item.src.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />

                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-75 transition-opacity duration-300`} />

                    {/* Content on hover */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-white font-display font-bold text-center text-sm md:text-base leading-tight">
                        {item.title}
                      </p>
                    </div>

                    {/* Category badge (always visible) */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${gradient} shadow`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh]">
                <Image
                  src={typeof filtered[lightbox]?.src === "string" ? filtered[lightbox]?.src : (filtered[lightbox]?.src as any)?.src}
                  alt={filtered[lightbox]?.title}
                  fill
                  className="rounded-2xl object-contain shadow-2xl"
                />
              </div>
              {/* Title bar */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-display font-bold text-lg">{filtered[lightbox]?.title}</h3>
                  <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[filtered[lightbox]?.category] || "from-primary to-secondary"}`}>
                    {filtered[lightbox]?.category}
                  </span>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
