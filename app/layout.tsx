import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClearUs | Academic Clearance Network",
  description: "Unified institutional clearance platform for digital verification.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-[#E0E0E0] antialiased select-none custom-scrollbar">
        {children}
      </body>
    </html>
  );
}