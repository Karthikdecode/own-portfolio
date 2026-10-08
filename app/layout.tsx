import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { buildStructuredData } from "@/lib/structuredData";
import { Providers } from "@/app/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConnectingPathway } from "@/components/navigation/ConnectingPathway";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: `${SITE_CONFIG.name} — Portfolio`,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.author,
  category: "technology",
  // Resolved against metadataBase → one absolute canonical for every variant
  // (deploy previews, query strings, branch deploys) of the homepage.
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Karthik",
    lastName: "P",
    locale: SITE_CONFIG.locale,
    url: "/",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: `${SITE_CONFIG.name} — Portfolio`,
    // og:image is provided by app/opengraph-image.tsx (generated).
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Google Search Console ownership (HTML tag method).
  verification: {
    google: "uoQ6XSJFYSw9cHd_WFmyLucNrSkA1focLOenehV",
  },
  // Stops iOS turning the phone number / email into styled auto-links.
  formatDetection: { telephone: false, email: false, address: false },
  icons: {
    icon: "/favicon.png",
    apple: "/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          // Escape "<" so no data value can ever close the script tag early.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildStructuredData()).replace(/</g, "\\u003c"),
          }}
        />
        <Providers>
          <ConnectingPathway />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="flex flex-1 flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
