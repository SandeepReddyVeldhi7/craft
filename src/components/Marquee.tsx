"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const clients = [
  "T-Shirts", "Caps", "Mugs", "Bags", "Bottles", "Pens", "Keychains", "Diaries",
  "Umbrellas", "ID Cards", "Banners", "Stickers", "Notebooks", "Gift Boxes",
];

const Marquee = () => {
  const [items, setItems] = useState<string[]>(clients);

  useEffect(() => {
    fetch("http://localhost:5000/api/marquee")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setItems(data.map((i: any) => i.text));
        }
      })
      .catch(err => console.error(err));
  }, []);

  // Triple the items to ensure enough content for smooth loop
  const displayItems = [...items, ...items, ...items];

  return (
    <div className="bg-primary py-4 mt-20 overflow-hidden relative border-y border-white/10">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {displayItems.map((item, i) => (
          <span key={i} className="text-primary-foreground/90 font-display font-bold text-lg md:text-xl uppercase tracking-wider flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(251,146,60,0.5)]" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
