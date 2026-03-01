import AboutClient from "./AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | A&A Pixel & Crafts",
    description: "Learn about A&A Pixel & Crafts, your trusted partner for premium corporate gifting and printing solutions since 2016.",
};

export default function AboutPage() {
    return <AboutClient />;
}
