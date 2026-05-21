import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hailey | 포트폴리오",
  description:
    "Hailey의 개인 포트폴리오입니다. 프로젝트, 경력, 연락처를 확인해보세요.",
  openGraph: {
    title: "Hailey | 포트폴리오",
    description: "Hailey의 포트폴리오 — 디자인과 개발을 함께합니다.",
    siteName: "Hailey Portfolio",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
