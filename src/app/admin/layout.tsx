"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard, Briefcase, PlusSquare, LogOut,
    Menu, X, ChevronDown, Home, Settings, Info, Phone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
    };

    const homeSubMenu = [
        { label: "Hero Slides", href: "/admin/hero", icon: PlusSquare },
        { label: "Marquee", href: "/admin/marquee", icon: LayoutDashboard },
        { label: "About (Home Preview)", href: "/admin/home/about", icon: Info },
        { label: "What We Offer", href: "/admin/home/services", icon: Briefcase },
        { label: "Our Numbers Speak", href: "/admin/counters", icon: LayoutDashboard },
        { label: "Project Gallery", href: "/admin/portfolio", icon: Briefcase },
        { label: "Let's Work Together", href: "/admin/cta", icon: LayoutDashboard },
    ];

    const aboutSubMenu = [
        { label: "Page Banner", href: "/admin/about/banner", icon: LayoutDashboard },
        { label: "Main Story", href: "/admin/about/story", icon: Info },
        { label: "What Drives Us", href: "/admin/about/drives", icon: PlusSquare },
        { label: "Why Choose Us", href: "/admin/about/why", icon: Info },
    ];

    const servicesSubMenu = [
        { label: "Page Banner", href: "/admin/services/banner", icon: LayoutDashboard },
        { label: "Services List", href: "/admin/services", icon: Briefcase },
    ];

    const portfolioSubMenu = [
        { label: "Page Banner", href: "/admin/portfolio/banner", icon: LayoutDashboard },
        { label: "Project Gallery", href: "/admin/portfolio", icon: Briefcase },
    ];

    const SidebarContent = () => {
        const [isAboutOpen, setIsAboutOpen] = useState(false);
        const [isServicesOpen, setIsServicesOpen] = useState(false);
        const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

        // Sync local dropdown states with current pathname
        useEffect(() => {
            if (pathname.includes("/admin/hero") || pathname.includes("/admin/marquee") || pathname.includes("/admin/home/about") || pathname.includes("/admin/counters") || pathname.includes("/admin/cta")) {
                setIsHomeDropdownOpen(true);
            }
            if (pathname.includes("/admin/about/")) {
                setIsAboutOpen(true);
            }
            if (pathname.includes("/admin/services")) {
                setIsServicesOpen(true);
            }
            if (pathname.includes("/admin/portfolio")) {
                setIsPortfolioOpen(true);
            }
        }, [pathname]);

        return (
            <div className="flex flex-col h-full">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h2 className="text-xl font-display font-bold text-primary">Admin Panel</h2>
                    <button className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto hide-scrollbar">
                    {/* Dashboard */}
                    <Link
                        href="/admin"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${pathname === "/admin" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>

                    {/* Home Dropdown */}
                    <div className="space-y-1">
                        <button onClick={() => setIsHomeDropdownOpen(!isHomeDropdownOpen)} className="flex w-full items-center justify-between px-4 py-3 rounded-lg font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                            <div className="flex items-center gap-3"><Home className="w-5 h-5" />Home</div>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isHomeDropdownOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                            {isHomeDropdownOpen && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 space-y-1">
                                    {homeSubMenu.map(item => (
                                        <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"}`}>
                                            <item.icon className="w-4 h-4" /> {item.label}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* About Dropdown */}
                    <div className="space-y-1">
                        <button onClick={() => setIsAboutOpen(!isAboutOpen)} className="flex w-full items-center justify-between px-4 py-3 rounded-lg font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                            <div className="flex items-center gap-3"><Info className="w-5 h-5" />About Page</div>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isAboutOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                            {isAboutOpen && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 space-y-1">
                                    {aboutSubMenu.map(item => (
                                        <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"}`}>
                                            <item.icon className="w-4 h-4" /> {item.label}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Services Dropdown */}
                    <div className="space-y-1">
                        <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="flex w-full items-center justify-between px-4 py-3 rounded-lg font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                            <div className="flex items-center gap-3"><Briefcase className="w-5 h-5" />Services</div>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                            {isServicesOpen && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 space-y-1">
                                    {servicesSubMenu.map(item => (
                                        <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"}`}>
                                            <item.icon className="w-4 h-4" /> {item.label}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Portfolio Dropdown */}
                    <div className="space-y-1">
                        <button onClick={() => setIsPortfolioOpen(!isPortfolioOpen)} className="flex w-full items-center justify-between px-4 py-3 rounded-lg font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                            <div className="flex items-center gap-3"><Briefcase className="w-5 h-5" />Portfolio</div>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isPortfolioOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                            {isPortfolioOpen && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 space-y-1">
                                    {portfolioSubMenu.map(item => (
                                        <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"}`}>
                                            <item.icon className="w-4 h-4" /> {item.label}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="pt-4 pb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 px-4">Global Config</div>

                    <Link href="/admin/header" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${pathname === "/admin/header" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>
                        <Settings className="w-5 h-5" /> Header Config
                    </Link>
                    <Link href="/admin/footer" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${pathname === "/admin/footer" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>
                        <Info className="w-5 h-5" /> Footer Info
                    </Link>
                    <Link href="/admin/contact" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${pathname === "/admin/contact" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>
                        <Phone className="w-5 h-5" /> Contact Config
                    </Link>
                </nav>

                <div className="p-4 border-t border-border">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 rounded-lg font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen bg-muted/20">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col h-screen sticky top-0">
                <SidebarContent />
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border px-4 flex items-center justify-between z-40">
                <h2 className="text-lg font-display font-bold text-primary">Admin Panel</h2>
                <button onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="w-6 h-6 text-muted-foreground" />
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-50 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-72 bg-card z-50 md:hidden shadow-2xl"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 mt-16 md:mt-0 hide-scrollbar overflow-y-auto max-h-screen">
                {children}
            </main>
        </div>
    );
}
