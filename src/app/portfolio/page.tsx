import PortfolioClient from "./PortfolioClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio | A&A Pixel & Crafts",
    description: "View our extensive portfolio of corporate gifting, custom printing, and branding merchandise projects.",
};

export default async function PortfolioPage() {
    let items = [];

    try {
        const res = await fetch("http://localhost:5000/api/portfolio", { next: { revalidate: 60 } });
        if (res.ok) {
            items = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch portfolio", error);
    }

    return <PortfolioClient items={items} />;
}
