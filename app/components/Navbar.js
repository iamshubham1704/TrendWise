"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // simple icon library (install: npm i lucide-react)

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black border-b border-cyan-500/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          TrendWise
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex gap-8">
          <NavLinks session={session} />
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-cyan-400 focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-black border-t border-cyan-500/20 px-6 py-4 flex flex-col gap-4">
          <NavLinks session={session} toggleMenu={() => setMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
}

function NavLinks({ session, toggleMenu }) {
  return (
    <>
      <Link
        href="/"
        onClick={toggleMenu}
        className="text-gray-300 hover:text-cyan-400 transition"
      >
        Home
      </Link>
      <Link
        href="/about"
        onClick={toggleMenu}
        className="text-gray-300 hover:text-cyan-400 transition"
      >
        About
      </Link>
      {session ? (
        <button
          onClick={() => {
            signOut({ callbackUrl: "/" });
            toggleMenu && toggleMenu();
          }}
          className="text-gray-300 hover:text-cyan-400 transition"
        >
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          onClick={toggleMenu}
          className="text-gray-300 hover:text-cyan-400 transition"
        >
          Login
        </Link>
      )}
    </>
  );
}
