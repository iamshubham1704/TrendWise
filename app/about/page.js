"use client";
import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          About TrendWise
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          TrendWise is an AI-powered platform that helps you explore, track, and discuss the latest trends
          across technology, science, business, and more. Built to help interns, students, and enthusiasts stay ahead.
        </p>
        <div className="flex justify-center gap-6 mt-8">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-700 text-black font-bold transition transform hover:scale-105"
          >
            Go Home
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 rounded-full border-2 border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-black font-bold transition transform hover:scale-105"
          >
            Join Us
          </Link>
        </div>
      </div>
    </main>
  );
}
