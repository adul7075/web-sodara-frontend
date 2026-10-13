"use client";

import React from "react";

export default function StatsSection() {
  const stats = [
    { value: "500+", label: "Proyek Selesai" },
    { value: "15+", label: "Tahun Pengalaman" },
    { value: "98%", label: "Kepuasan Pelanggan" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl shadow-md py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <p className="text-3xl md:text-4xl font-semibold">{stat.value}</p>
                <p className="text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
