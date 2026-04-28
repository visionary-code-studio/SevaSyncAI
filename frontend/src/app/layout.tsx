import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SevaSync AI | Smart Resource Allocation",
  description: "Data-driven volunteer coordination for social impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.className, geist.variable)} suppressHydrationWarning>
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen pt-28 relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
