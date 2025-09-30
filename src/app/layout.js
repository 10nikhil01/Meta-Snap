import { getSiteUrl } from "@/utils/getSiteURL";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const siteUrl = getSiteUrl();

export const metadata = {
  title: "Meta Snap - Instant SEO Insights",
  description:
    "Enter any website URL and get instant SEO analysis including meta tags, meta properties and other SEO insights.",
  keywords: [
    "SEO",
    "Meta Snap",
    "Website Analysis",
    "Meta Tags",
    "Structured Data",
    "SEO Checker",
    "Meta Data Extractor",
    "SEO Tools",
  ],
  authors: [
    {
      name: "Nikhil Kumar",
      url: "https://www.linkedin.com/in/reachnik",
    },
  ],
  creator: "Nikhil Kumar",
  publisher: "Meta Snap",

  metadataBase: new URL(siteUrl),

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  openGraph: {
    title: "Meta Snap - Instant SEO Insights",
    description:
      "Fetch SEO data and meta information for any website instantly using MetaSnap.",
    url: siteUrl,
    siteName: "Meta Snap",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "MetaSnap SEO Analysis",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Meta Snap - Instant SEO Insights",
    description:
      "Fetch SEO data and meta information for any website instantly using MetaSnap.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@yourtwitterhandle",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  themeColor: "#1d4ed8",
  applicationName: "Meta Snap",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Meta Snap",
  },
  formatDetection: {
    telephone: false,
  },

  manifest: `${siteUrl}/manifest.json`,

  category: "technology",

  alternates: {
    languages: {
      "en-US": siteUrl,
      "hi-IN": siteUrl,
      "x-default": siteUrl,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
