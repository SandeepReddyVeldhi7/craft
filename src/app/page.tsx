import HomeClient from "./HomeClient";

// SEO Metadata for the home page
export const metadata = {
  title: "A&A Pixel & Crafts - Home | Premium Printing & Gifting",
  description: "Your trusted partner for corporate gifting, printing, and branding solutions. We deliver premium quality products that leave lasting impressions.",
  openGraph: {
    title: "A&A Pixel & Crafts",
    description: "Your trusted partner for corporate gifting, printing, and branding solutions.",
    images: ["/og-image.jpg"],
  }
};

export default async function Page() {
  // Fetch dynamic data from Express Backend
  let services = [];
  let portfolioItems = [];

  // try {
  //   const [resServices, resPortfolio] = await Promise.all([
  //     fetch("http://localhost:5000/api/services", { next: { revalidate: 60 } }),
  //     fetch("http://localhost:5000/api/portfolio", { next: { revalidate: 60 } })
  //   ]);

  //   if (resServices.ok) services = await resServices.json();
  //   if (resPortfolio.ok) portfolioItems = await resPortfolio.json();
  // } catch (error) {
  //   console.error("Failed to fetch dynamic data for home page:", error);
  //   // Graceful fallback to static data handled in the client components
  // }

  return (
    <main className="flex  min-h-screen flex-col">
      <HomeClient />
    </main>
  );
}
