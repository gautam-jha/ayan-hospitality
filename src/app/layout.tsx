import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { SanityLive } from "@/sanity/live";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayanhospitality.com"),
  title: {
    default: "Ayan Hospitality | Wedding Hospitality & Logistics India",
    template: "%s | Ayan Hospitality",
  },
  description:
    "India's trusted wedding hospitality and logistics partner. 800+ weddings, 1,00,000+ guests, 30+ cities. RSVP management, guest help desk, VIP handling, airport transfers, and more.",
  keywords: [
    "wedding hospitality India",
    "wedding logistics company India",
    "RSVP management wedding",
    "wedding guest management",
    "wedding logistics Udaipur",
    "wedding logistics Delhi",
    "destination wedding logistics",
    "Ayan Hospitality",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ayanhospitality.com",
    siteName: "Ayan Hospitality",
    title: "Ayan Hospitality | Be Our Guest",
    description:
      "India's trusted wedding hospitality and logistics partner. 800+ weddings delivered across 30+ cities.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ayan Hospitality | Be Our Guest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayan Hospitality | Be Our Guest",
    description:
      "India's trusted wedding hospitality and logistics partner. 800+ weddings delivered across 30+ cities.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ayan Hospitality",
  description:
    "Wedding hospitality and logistics company operating across India and select international destinations.",
  url: "https://ayanhospitality.com",
  telephone: "+918826104232",
  email: "hello@ayanhospitality.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "Delhi NCR",
  },
  areaServed: ["India", "UAE", "Sri Lanka", "Indonesia", "Thailand"],
  sameAs: [
    "https://instagram.com/ayanhospitality",
    "https://facebook.com/ayanhospitality",
  ],
  priceRange: "₹₹₹",
  image: "https://ayanhospitality.com/og-image.jpg",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-body antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
        <Footer />
        <WhatsAppFAB />
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
