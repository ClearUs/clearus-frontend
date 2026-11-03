import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "@/components/shared/ThemeProvider";

export const viewport: Viewport = {
  themeColor: "#16A34A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_DOMAIN
      ? `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`
      : "https://clearus.tech"
  ),
  title: {
    default: "ClearUs — Complete your clearance, without the queues",
    template: "%s | ClearUs",
  },
  description:
    "Graduation clearance for Nigerian universities, fully online. Upload your documents once, follow every step, and collect your certificate without running from office to office.",
  applicationName: "ClearUs",
  keywords: [
    "ClearUs",
    "academic clearance",
    "graduation clearance",
    "Nigerian universities",
    "student portal",
    "document vault",
    "FUTO",
    "UNILAG",
    "UNN",
    "OAU",
    "clearance certificate",
  ],
  authors: [{ name: "ClearUs Digital Infrastructure Limited" }],
  creator: "ClearUs Digital Infrastructure Limited",
  publisher: "ClearUs Digital Infrastructure Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://clearus.tech",
    siteName: "ClearUs",
    title: "ClearUs — Complete your clearance, without the queues",
    description:
      "Graduation clearance for Nigerian universities, fully online. Upload your documents once, follow every step, and collect your certificate without running from office to office.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 690,
        alt: "ClearUs — Complete your clearance, without the queues",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearUs — Complete your clearance, without the queues",
    description:
      "Graduation clearance for Nigerian universities, fully online. Upload your documents once, follow every step, and collect your certificate without running from office to office.",
    images: ["/og-image.png"],
    creator: "@clearustech",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-bg-dark text-body antialiased select-none custom-scrollbar">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
