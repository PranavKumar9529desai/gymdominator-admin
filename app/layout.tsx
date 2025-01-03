import type { Metadata } from "next";
import "./globals.css";
import Providers from "./provider";
import RecoilContextProvider from "@/lib/RecoilContextProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <RecoilContextProvider>
          <body>{children}</body>
        </RecoilContextProvider>
      </Providers>
    </html>
  );
}
