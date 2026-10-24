import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileBookBar from "@/components/layout/StickyMobileBookBar";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel Royal Heights Rishikesh | Official Direct Booking & Best Rates",
  description:
    "Experience luxury boutique comfort in Tapovan, Rishikesh with scenic Himalayan views, rooftop dining, high-speed Wi-Fi, and personalized yoga & river rafting experiences. Book direct for the best rate guarantee.",
  keywords: [
    "Hotel Royal Heights Rishikesh",
    "Hotels in Tapovan Rishikesh",
    "Luxury hotel Rishikesh",
    "Ganges view resort",
    "Rishikesh river rafting stay",
    "Boutique stay Uttarakhand",
  ],
  openGraph: {
    title: "Hotel Royal Heights Rishikesh — Official Direct Booking",
    description:
      "Boutique sanctuary overlooking the holy Ganges and Shivalik hills. Enjoy rooftop dining, yoga retreat lawns, and premium rooms.",
    url: "https://hotelroyalheights.com",
    siteName: "Hotel Royal Heights",
    images: [
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Hotel Royal Heights Rishikesh Luxury Stay",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-hotel-glow text-slate-800 antialiased pb-16 md:pb-0">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileBookBar />
      </body>
    </html>
  );
}
