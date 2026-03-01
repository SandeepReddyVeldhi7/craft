"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shirt, BookOpen, Coffee, ShoppingBag, PenTool, Key, Umbrella, Gift,
  ArrowRight, Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    icon: Gift,
    title: "Corporate Gift Kits",
    desc: "Premium joining kits, welcome hampers & festival packs curated to impress.",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    featured: true,
  },
  {
    icon: Shirt,
    title: "T-Shirt Printing",
    desc: "Screen print, DTF & embroidery for teams and events.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
  },
  {
    icon: Coffee,
    title: "Mugs & Drinkware",
    desc: "Ceramic mugs, steel bottles & tumblers with your brand.",
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
  },
  {
    icon: ShoppingBag,
    title: "Bags & Pouches",
    desc: "Tote bags, backpacks & laptop bags with stunning prints.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
  },
  {
    icon: BookOpen,
    title: "Diaries & Notebooks",
    desc: "Leather diaries, planners & corporate stationery.",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-50",
  },
  {
    icon: PenTool,
    title: "Pens & Stationery",
    desc: "Branded metal & plastic pens for giveaways.",
    color: "from-sky-500 to-indigo-500",
    bg: "bg-sky-50",
  },
  {
    icon: Key,
    title: "Keychains",
    desc: "Metal, acrylic & leather keychains with engraving.",
    color: "from-yellow-500 to-orange-500",
    bg: "bg-yellow-50",
  },
  {
    icon: Umbrella,
    title: "Umbrellas",
    desc: "Golf, folding & patio umbrellas with your logo.",
    color: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-50",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } },
};

const iconMap: Record<string, any> = { Shirt, BookOpen, Coffee, ShoppingBag, PenTool, Key, Umbrella, Gift };

export default function ServicesSection({
  dynamicServices,
  title = "Premium Branding & Print Services",
  description = "From corporate gifting to high-quality printing, we deliver branded merchandise that makes an impression."
}: {
  dynamicServices?: any[],
  title?: string,
  description?: string
}) {
  const displayServices =
    dynamicServices && dynamicServices.length > 0
      ? dynamicServices.map((s, i) => ({
        ...services[i % services.length],
        ...s,
        icon: iconMap[s.icon] || Gift,
      }))
      : services;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const featured = displayServices.find((s) => s.featured) || displayServices[0];
  const rest = displayServices.filter((s) => s !== featured);

  return (
    <section id="services" className="section-padding bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative background blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      <div className="container-main relative">
        {/* Section header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span className="text-secondary font-semibold text-xs uppercase tracking-widest">What We Offer</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              {title.includes("Branding") ? (
                <>
                  {title.split("Branding")[0]}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Branding
                  </span>
                  {title.split("Branding")[1]}
                </>
              ) : title}
            </h2>
          </div>
          <div className="md:max-w-xs">
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {description}
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-200"
            >
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Featured large card — spans 2 cols & 2 rows on lg */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-2xl p-7 flex flex-col justify-between min-h-[260px] cursor-pointer"
            style={{ background: `linear-gradient(135deg, hsl(220 80% 45%), hsl(25 95% 55%))` }}
          >
            {/* Decorative ring */}
            <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -right-4 -bottom-8 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-auto">
              <featured.icon className="w-7 h-7 text-white" strokeWidth={1.8} />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-3">
                ⭐ Most Popular
              </span>
              <h3 className="font-display font-bold text-2xl text-white mb-2">{featured.title}</h3>
              <p className="text-white/75 text-sm leading-relaxed mb-5">{featured.desc}</p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary font-semibold text-sm hover:-translate-y-0.5 transition-transform duration-200 group-hover:shadow-lg"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Regular service cards */}
          {rest.slice(0, 6).map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className={`group relative overflow-hidden rounded-2xl p-5 flex flex-col gap-3 cursor-pointer border border-border/60 bg-card hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Hover gradient bg */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${service.color}`} />

                <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md overflow-hidden`}>
                  {service.imageUrl ? (
                    <Image src={service.imageUrl} alt={service.title} fill className="object-cover" />
                  ) : (
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                  )}
                </div>

                <div className="relative flex-1">
                  <h3 className="font-display font-bold text-base mb-1 group-hover:text-primary transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{service.desc}</p>
                </div>

                <div className="relative flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
