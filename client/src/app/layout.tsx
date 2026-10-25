import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileBookBar from "@/components/layout/StickyMobileBookBar";
import siteConfig from "@/data/site";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hotelroyalheightsrishikesh.com"),
  title: "Hotel Royal Heights Rishikesh | Official Direct Booking",
  description:
    "Wake up to the Ganga & the Himalayas. Boutique hotel in Upper Tapovan, Rishikesh with scenic mountain balconies, rooftop cafe, and daily morning yoga. Guaranteed best direct rates.",
  keywords: [
    "Hotel Royal Heights Rishikesh",
    "Hotels in Tapovan Rishikesh",
    "Luxury boutique hotel Rishikesh",
    "Ganges view rooms Rishikesh",
    "Rishikesh river rafting stay",
    "Tapovan hotel booking",
  ],
  authors: [{ name: "Hotel Royal Heights" }],
  openGraph: {
    title: "Hotel Royal Heights Rishikesh — Official Direct Booking",
    description:
      "Wake up to the Ganga & the Himalayas. Boutique hotel in Upper Tapovan, Rishikesh with scenic balconies and rooftop dining.",
    url: "https://hotelroyalheights.com",
    siteName: "Hotel Royal Heights",
    images: [
      {
        url: "/images/hero-rishikesh-ganga.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel Royal Heights Rishikesh Ganga & Mountain View",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

// Hotel JSON-LD Schema
const hotelJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": siteConfig.hotel.name,
  "description": siteConfig.hotel.shortDescription,
  "image": "https://hotelroyalheights.com/images/hero-rishikesh-ganga.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Badrinath National Highway, Upper Tapovan",
    "addressLocality": "Rishikesh",
    "addressRegion": "Uttarakhand",
    "postalCode": "249192",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.134599,
    "longitude": 78.318858
  },
  "url": "https://hotelroyalheights.com",
  "telephone": siteConfig.hotel.contact.phone,
  "priceRange": "₹2,199 - ₹5,499",
  "checkinTime": "12:00",
  "checkoutTime": "11:00"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }}
        />
      </head>
      <body className={`${plusJakarta.className} ${plusJakarta.variable} ${playfair.variable} min-h-screen flex flex-col bg-[#FAF9F7] text-slate-700 antialiased selection:bg-[#C9A24B]/20 selection:text-[#1B1B4B] overflow-x-hidden`}>
        {/* Global Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Global Footer */}
        <Footer />

        {/* Mobile Sticky Bar with Call & WhatsApp buttons */}
        <StickyMobileBookBar />
      </body>
    </html>
  );
}
