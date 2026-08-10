import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/shared/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-bg-dark text-body antialiased select-none custom-scrollbar">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
