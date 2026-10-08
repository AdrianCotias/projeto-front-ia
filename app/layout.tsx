import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = { title: "KURIO — NFT Marketplace" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
