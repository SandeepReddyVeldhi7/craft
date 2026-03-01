"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Package, Award, Smile, TrendingUp, Briefcase, Star, Clock, Shield, Zap } from "lucide-react";

const iconMap = {
  Users, Package, Award, Smile, TrendingUp, Briefcase, Star, Clock, Shield, Zap
};

const counters = [
  {
    icon: Users,
    target: 500,
    label: "Happy Clients",
    suffix: "+",
    gradient: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/30",
    bg: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/20",
    desc: "across India",
  },
  {
    icon: Package,
    target: 10000,
    label: "Products Delivered",
    suffix: "+",
    gradient: "from-orange-500 to-amber-500",
    glow: "shadow-orange-500/30",
    bg: "from-orange-500/10 to-amber-500/10",
    border: "border-orange-500/20",
    desc: "on time, every time",
  },
  {
    icon: Award,
    target: 8,
    label: "Years Experience",
    suffix: "+",
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/30",
    bg: "from-violet-500/10 to-purple-600/10",
    border: "border-violet-500/20",
    desc: "since 2016",
  },
  {
    icon: Smile,
    target: 99,
    label: "Satisfaction Rate",
    suffix: "%",
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/30",
    bg: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/20",
    desc: "client happiness",
  },
];

const Counter = ({
  target,
  suffix,
  gradient,
}: {
  target: number;
  suffix: string;
  gradient: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span
      ref={ref}
      className={`text-4xl md:text-5xl font-display font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } },
};

const CountersSection = () => {
  const [data, setData] = useState<any[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    fetch("http://localhost:5000/api/counters")
      .then(res => res.json())
      .then(items => {
        if (items && items.length > 0) setData(items);
        else setData(counters);
      })
      .catch(() => setData(counters));
  }, []);

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-slate-900" ref={ref}>
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-secondary/20 blur-[80px] pointer-events-none" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-main px-4 sm:px-6 lg:px-8 relative">
        {/* Top label */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15">
            <TrendingUp className="w-3.5 h-3.5 text-secondary" />
            <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">
              Our Numbers Speak
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>

        {/* Counter cards */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {data.map((item) => {
            const Icon = (iconMap as any)[item.icon] || Users;
            return (
              <motion.div
                key={item.label}
                variants={cardVariants}
                className={`relative group rounded-2xl border ${item.border || 'border-white/10'} bg-gradient-to-br ${item.bg || 'from-white/5 to-white/5'} backdrop-blur-sm p-6 md:p-7 flex flex-col items-center text-center hover:scale-[1.03] transition-transform duration-300`}
              >
                {/* Icon circle */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient || 'from-primary to-secondary'} flex items-center justify-center mb-4 shadow-lg ${item.glow || ''}`}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                </div>

                {/* Animated number */}
                <Counter target={item.target} suffix={item.suffix} gradient={item.gradient || 'from-white to-white/60'} />

                {/* Label */}
                <p className="text-white font-semibold text-sm mt-1">{item.label}</p>

                {/* Sub-label */}
                <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>

                {/* Hover glow ring */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient || 'from-primary/20 to-secondary/20'} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CountersSection;
