import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kutup Yıldızı | Sınav yolculuğunda yönün belli olsun",
  description:
    "Yapay zekâ destekli planlama, psikoeğitim ve insan rehberliğiyle sınav yolculuğunu kendine göre şekillendir.",
  keywords: [
    "Kutup Yıldızı",
    "sınav koçluğu",
    "YKS koçluğu",
    "LGS koçluğu",
    "psikoeğitim",
    "yapay zekâ eğitim danışmanlığı",
  ],
  openGraph: {
    title: "Kutup Yıldızı Eğitim Danışmanlığı",
    description:
      "Her hedefin bir yönü, her yolculuğun bir rehberi vardır.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
