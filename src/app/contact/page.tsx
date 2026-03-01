import ContactClient from "./ContactClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | A&A Pixel & Crafts",
    description: "Get in touch with us for a free quote or consultation regarding your corporate gifting and branding needs.",
};

export default function ContactPage() {
    return <ContactClient />;
}
