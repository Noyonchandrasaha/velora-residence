import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SiteLoader } from "@/components/layout/site-loader";

export const metadata: Metadata = {
  title: "The Hidden Retreat — Forest Residence",
  description: "A scroll-led editorial experience for a private forest retreat.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteLoader />
        <SmoothScrollProvider>
          <ScrollProgress />
          <SiteHeader />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
