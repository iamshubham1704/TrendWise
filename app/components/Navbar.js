"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black border-b border-cyan-500/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          TrendWise
        </Link>
        <div className="flex gap-8">
          <Link href="/" className="text-gray-300 hover:text-cyan-400 transition">
            Home
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition">
            About
          </Link>
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-gray-300 hover:text-cyan-400 transition"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="text-gray-300 hover:text-cyan-400 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
