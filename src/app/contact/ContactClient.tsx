"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ContactClient() {
    const [sent, setSent] = useState(false);
    const [config, setConfig] = useState<any>(null);
    const [banner, setBanner] = useState<any>(null);

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:5000/api/contact-config").then(res => res.json()),
            fetch("http://localhost:5000/api/contact-config/banner").then(res => res.json())
        ]).then(([configData, bannerData]) => {
            if (configData && configData.phone) setConfig(configData);
            if (bannerData) setBanner(bannerData);
        }).catch(err => console.error(err));
    }, []);

    const phone = "+91 9100760587";
    const email = config?.email || "info@aapixelcrafts.com";
    const address = config?.address || "Hyderabad, Telangana, India";
    const workingHours = config?.workingHours || "Mon - Sat: 9:00 AM - 7:00 PM";
    const mapUrl = config?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3170773!2d78.24323!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <div className="min-h-screen bg-background">
            <section className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-primary/90 to-slate-900">
                {banner?.imageUrl && (
                    <div className="absolute inset-0 opacity-20 relative">
                        <Image src={banner.imageUrl} alt="Banner" fill className="object-cover" />
                    </div>
                )}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-secondary blur-[120px]" />
                    <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-primary blur-[80px]" />
                </div>

                <div className="container-main px-4 relative text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-5 leading-[1.05]">
                            {banner?.title ? (
                                banner.title.includes("Contact") ? (
                                    <>
                                        {banner.title.split("Contact")[0]}
                                        <span className="bg-gradient-to-r from-secondary to-orange-400 bg-clip-text text-transparent">Contact Us</span>
                                        {banner.title.split("Contact Us")[1]}
                                    </>
                                ) : banner.title
                            ) : (
                                <>Contact <span className="bg-gradient-to-r from-secondary to-orange-400 bg-clip-text text-transparent">Us</span></>
                            )}
                        </h1>
                        <p className="text-white/60 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                            {banner?.subtitle || "Get in touch for a free quote or consultation. We're here to help you grow your brand."}
                        </p>
                    </motion.div>

                    {/* Stats pills */}
                    {banner?.stats?.length > 0 && (
                        <motion.div
                            className="flex flex-wrap justify-center gap-3 mt-10"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            {banner.stats.map((stat: any) => (
                                <span
                                    key={stat.label}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white text-sm font-medium"
                                >
                                    <span>{stat.icon}</span>
                                    {stat.label}
                                </span>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            <section className="section-padding bg-background">
                <div className="container-main grid lg:grid-cols-2 gap-12">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 className="text-3xl font-display font-bold mb-6">
                            Let's <span className="gradient-text">Talk</span>
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Have a project in mind? Reach out to us and we'll help you bring your branding vision to life.
                        </p>
                        <div className="space-y-6">
                            {[
                                { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/\D/g, '')}` },
                                { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
                                { icon: MapPin, label: "Address", value: address },
                                { icon: Clock, label: "Working Hours", value: workingHours },
                            ].map((item) => (
                                <div key={item.label} className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-5 h-5 text-accent-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-muted-foreground">{item.label}</p>
                                        {item.href ? (
                                            <a href={item.href} className="font-semibold hover:text-primary transition-colors">{item.value}</a>
                                        ) : (
                                            <p className="font-semibold">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="glass-card rounded-2xl p-8"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-display font-bold mb-6">Send us a message</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none text-sm"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none text-sm"
                                />
                            </div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none text-sm"
                            />
                            <input
                                type="text"
                                placeholder="Subject"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none text-sm"
                            />
                            <textarea
                                placeholder="Your Message"
                                rows={4}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none text-sm resize-none"
                            />
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                            >
                                {sent ? "Message Sent! ✓" : <><Send className="w-4 h-4" /> Send Message</>}
                            </button>
                        </div>
                    </motion.form>
                </div>
            </section>

            <section className="w-full h-80">
                <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location"
                />
            </section>
        </div>
    );
}
