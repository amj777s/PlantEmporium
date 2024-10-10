import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { EB_Garamond } from "next/font/google";
import NavBar from "../components/NavBar";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const garmond = EB_Garamond({
  subsets: ['latin'],
  display: "swap",
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: "Plant Emporium",
  description: "Your one stop shop for plants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${garmond}  antialiased`} >
      <NavBar />
        {children}
      </body>
    </html>
  );
}
