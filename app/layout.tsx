import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
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

const siteUrl = "https://lojazapi.online";

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
      <body>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2600977440347363');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=2600977440347363&ev=PageView&noscript=1" alt="" />
        </noscript>
        {children}
      </body>
    </html>
  );
}
