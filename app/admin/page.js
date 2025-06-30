import React from "react";

export default function AdminPage() {
  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-400">Manage articles, trigger trend crawler, and view stats here.</p>
      </div>
    </main>
  );
}
