import type { Metadata } from "next";

import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { EB_Garamond } from "next/font/google";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";

const garmond = EB_Garamond({
  subsets: ['latin'],
  display: "swap",
  fallback: ['system-ui', 'arial']
});

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
      <body className={` ${garmond}  antialiased`} >
      <NavBar />
        {children}
      <ToastContainer autoClose={5000} />
      </body>
    </html>
  );
}
