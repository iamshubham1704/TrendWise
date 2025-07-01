import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./sessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TrendWise",
  description: "Your AI-powered platform to track trends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <Navbar />
          {children}
          <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
