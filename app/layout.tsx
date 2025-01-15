import "./globals.css";
import Providers from "./provider";
import RecoilContextProvider from "@/lib/RecoilContextProvider";
import { Toaster } from "sonner";
import type { ToasterProps } from "sonner";
import { Metadata } from 'next'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata: Metadata = {
  title: 'GymNavigator Admin Dashboard',
  description: 'Administrative control panel for gym owners and trainers - GymNavigator platform management',
  keywords: ['gym management dashboard', 'trainer admin', 'gym owner portal', 'GymNavigator admin'],
  openGraph: {
    title: 'GymNavigator Admin Dashboard',
    description: 'Secure administrative portal for gym owners and trainers',
    images: [{
      url: 'https://admin.gymnavigator.in/gymnavigator-og.jpg',
      width: 1200,
      height: 630,
      alt: 'GymNavigator Admin Control Panel'
    }],
    siteName: 'GymNavigator Admin Portal',
    locale: 'en_US',
    type: 'website',
    url: 'https://admin.gymnavigator.in'
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
  metadataBase: new URL('https://admin.gymnavigator.in')
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
        <RecoilContextProvider>layoutlayoutlayout
          <body>
            {children}
            <Toaster {...toasterProps} />
          </body>
        </RecoilContextProvider>
      </Providers>
    </html>
  );
}
