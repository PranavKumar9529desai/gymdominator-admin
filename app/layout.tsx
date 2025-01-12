import "./globals.css";
import Providers from "./provider";
import RecoilContextProvider from "@/lib/RecoilContextProvider";
import { Toaster } from "sonner";
import type { ToasterProps } from "sonner";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GymNavigator - Gym Management System',
  description: 'Professional gym management solution for trainers and gym owners',
  keywords: ['gym management', 'fitness tracking', 'trainer portal'],
  openGraph: {
    title: 'GymNavigator',
    description: 'Professional gym management solution',
    images: [{
      url: '/gymnavigator-og.jpg', // Make sure this image exists in your public folder
      width: 1200,
      height: 630,
      alt: 'GymNavigator - Professional Gym Management System'
    }],
    siteName: 'GymNavigator',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const toasterProps: ToasterProps = {
    richColors: true,
    theme: 'light',
    position: 'top-right',
  };

  return (
    <html lang="en">
      <Providers>
        <RecoilContextProvider>
          <body>
            {children}
            <Toaster {...toasterProps} />
          </body>
        </RecoilContextProvider>
      </Providers>
    </html>
  );
}
