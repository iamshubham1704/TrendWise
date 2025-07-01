"use client";
import React from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-10 rounded-xl shadow-lg text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Sign in to TrendWise</h1>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-full hover:scale-105 transition"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
