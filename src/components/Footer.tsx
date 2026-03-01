"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const [config, setConfig] = useState<any>(null);
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/footer").then(res => res.json()),
      fetch("http://localhost:5000/api/contact-config").then(res => res.json())
    ]).then(([footerData, contactData]) => {
      if (footerData) setConfig(footerData);
      if (contactData) setContact(contactData);
    }).catch(err => console.error("Footer fetch error:", err));
  }, []);

  const logoText = config?.logoText || "A";
  const brandName = config?.brandName || "A&A Pixel";
  const brandTagline = config?.brandTagline || "& CRAFTS";
  const description = config?.description || "Your one-stop destination for corporate gifting, custom printing, and branded merchandise solutions.";

  const address = contact?.address || "Hyderabad, Telangana, India";
  const phone = contact?.phone || "+91 9100760587";
  const email = contact?.email || "info@aapixelcrafts.com";

  const quickLinks = config?.quickLinks?.length > 0 ? config.quickLinks : [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" }
  ];

  const socialIcons: any = { Facebook, Instagram, Twitter, Linkedin };

  return (
    <footer className="bg-foreground text-background">
      <div className="container-main section-padding pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">{logoText}</span>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-background text-nowrap">{brandName}</span>
                <span className="block text-[10px] text-background/60 tracking-wider font-semibold uppercase">{brandTagline}</span>
              </div>
            </div>
            <p className="text-background/60 text-sm leading-relaxed pr-4">
              {description}
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link: any) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-background/60 hover:text-secondary transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Services</h4>
            <div className="space-y-2 text-sm text-background/60">
              {["T-Shirt Printing", "Corporate Gifts", "ID Cards", "Mugs & Bottles", "Banners & Stickers"].map((s) => (
                <p key={s}>{s}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-background/60">
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Phone className="w-4 h-4" /> {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Mail className="w-4 h-4" /> {email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> <span className="pr-4">{address}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              {config?.socialLinks?.length > 0 ? (
                config.socialLinks.map((s: any, i: number) => {
                  const Icon = socialIcons[s.platform] || Facebook;
                  return (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors">
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })
              ) : (
                [Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 text-center text-sm text-background/40">
          © {new Date().getFullYear()} A&A Pixel & Crafts. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
