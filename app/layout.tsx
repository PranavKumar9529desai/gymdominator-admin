import "./globals.css";
import Providers from "./provider";
import RecoilContextProvider from "@/lib/RecoilContextProvider";
import { Toaster } from "sonner";
import type { ToasterProps } from "sonner";
import { Metadata } from 'next'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SpeedInsights } from "@vercel/speed-insights/next"

const siteUrl = 'https://admin.gymnavigator.in';

export const metadata: Metadata = {
  title: 'GymDominator - Gym Management System',
  description: 'Transform your gym management with GymDominator. The all-in-one solution for modern gym owners and trainers.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GymDominator - Gym Management System',
    description: 'Transform your gym management with GymDominator. The all-in-one solution for modern gym owners and trainers.',
    url: siteUrl,
    siteName: 'GymDominator',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: '/gymnavigator-og.jpg', // Direct path to OG image in public directory
      width: 1200,
      height: 630,
      alt: 'GymDominator - Modern Gym Management',
      type: 'image/jpeg',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GymDominator - Gym Management System',
    description: 'Transform your gym management with GymDominator. The all-in-one solution for modern gym owners and trainers.',
    images: ['/gymnavigator-og.jpg'],
  },
  other: {
    'og:image:secure_url': `${siteUrl}/gymnavigator-og.jpg`,
    'theme-color': '#1e40af',
    'msapplication-TileColor': '#1e40af',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon/safari-pinned-tab.svg', color: '#1e40af' },
    ],
  },
  manifest: '/site.webmanifest',
};

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
