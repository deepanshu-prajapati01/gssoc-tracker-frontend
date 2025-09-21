import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import { metadata as baseMetadata } from "@/lib/seoMetadata";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppProvider from "@/providers/AppProvider";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = baseMetadata


export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <GoogleAnalytics />
      </head>

      <body className={`${spaceGrotesk.className} font-sans antialiased`}>
        <AppProvider>
          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />
          <Toaster />
        </AppProvider>
      </body>

    </html >
  );
}
