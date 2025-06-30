import "./globals.css";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "TrendWise",
  description: "Your AI-powered trend platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 border-b border-gray-800 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
          >
            TrendWise
          </Link>
          <nav className="space-x-6">
            <Link href="/" className="hover:text-cyan-400">
              Home
            </Link>
            <Link href="/login" className="hover:text-cyan-400">
              Login
            </Link>
            <Link href="/admin" className="hover:text-cyan-400">
              Admin
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 border-t border-gray-800">
          &copy; 2025 TrendWise. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
