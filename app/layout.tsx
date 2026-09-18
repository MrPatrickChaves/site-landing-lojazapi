import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = "https://lojazapi.flexiweb.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "LojaZapi - Sua lojinha online com pedidos no WhatsApp",
  description:
    "Crie sua lojinha online, mostre seus produtos e receba pedidos organizados direto no WhatsApp. Gratis ate 2 produtos, com opcao de personalizacao visual.",
  keywords: [
    "LojaZapi",
    "lojinha online",
    "catalogo pelo WhatsApp",
    "pedidos no WhatsApp",
    "loja para pequenos vendedores",
    "catalogo digital",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LojaZapi - Sua lojinha online com pedidos no WhatsApp",
    description:
      "Venda online sem complicacao, sem comissao e com pedidos organizados direto no WhatsApp.",
    url: siteUrl,
    siteName: "LojaZapi",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LojaZapi - Sua lojinha online com pedidos no WhatsApp",
    description:
      "Crie sua lojinha online e receba pedidos organizados direto no WhatsApp.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
