import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Impression Labz | AI Solutions & Agent Enablement | California",
  description:
    "Impression Labz builds cutting-edge AI solutions for platforms, OpenClaw-based agents, and enterprise agent enablement. Based in California — where human intelligence meets machine precision.",
  keywords: [
    "AI solutions", "agent enablement", "OpenClaw", "artificial intelligence",
    "California AI company", "platform AI", "AI consulting", "machine learning",
    "intelligent agents", "AI integration"
  ],
  authors: [{ name: "Impression Labz", url: "https://impressionlabz.com" }],
  creator: "Impression Labz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://impressionlabz.com",
    siteName: "Impression Labz",
    title: "Impression Labz | AI Solutions & Agent Enablement",
    description: "Where Human Intelligence Meets Machine Precision. AI solutions for platforms, OpenClaw agents, and enterprise enablement.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Impression Labz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Impression Labz | AI Solutions",
    description: "Where Human Intelligence Meets Machine Precision.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://impressionlabz.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://impressionlabz.com/#org",
      name: "Impression Labz",
      url: "https://impressionlabz.com",
      logo: "https://impressionlabz.com/logo.png",
      description: "AI solutions company based in California specializing in platform AI, OpenClaw agents, and enterprise agent enablement.",
      address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" },
      contactPoint: { "@type": "ContactPoint", email: "theo@impressionlabz.com", contactType: "customer service" },
      sameAs: ["https://github.com/theo-impressionlabz"],
    },
    {
      "@type": "WebSite",
      "@id": "https://impressionlabz.com/#website",
      url: "https://impressionlabz.com",
      name: "Impression Labz",
      publisher: { "@id": "https://impressionlabz.com/#org" },
    },
    {
      "@type": "Service",
      name: "Platform AI Integration",
      provider: { "@id": "https://impressionlabz.com/#org" },
      description: "Embed intelligence into existing platforms with custom AI pipelines.",
      areaServed: "US",
    },
    {
      "@type": "Service",
      name: "OpenClaw Agent Development",
      provider: { "@id": "https://impressionlabz.com/#org" },
      description: "Custom AI agents built on the OpenClaw framework for autonomous task execution.",
      areaServed: "US",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0a0f] text-[#e2e8f0] antialiased">{children}</body>
    </html>
  );
}
