import ServicesClient from "./ServicesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Corporate Gifting & Custom Printing",
    description: "Explore our complete range of branding solutions including t-shirt printing, mugs, notebooks, corporate kits, and more.",
};

export default async function ServicesPage() {
    let services = [];

    try {
        const res = await fetch("http://localhost:5000/api/services", { next: { revalidate: 60 } });
        if (res.ok) {
            services = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch services", error);
    }

    return <ServicesClient services={services} />;
}
