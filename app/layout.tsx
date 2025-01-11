import "./globals.css";
import Providers from "./provider";
import RecoilContextProvider from "@/lib/RecoilContextProvider";
import { Toaster } from "sonner";
import type { ToasterProps } from "sonner";

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
