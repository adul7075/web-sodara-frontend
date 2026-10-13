"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-[#f8fbff] py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Kiri: Teks */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm px-4 py-2 rounded-full font-medium">
            <span>⭐ Dipercaya Lebih dari 500+ Pelanggan</span>
          </div>

          {/* Judul */}
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Solusi Pagar, Tralis & Kanopi Berkualitas Tinggi
          </h1>

          {/* Deskripsi */}
          <p className="mt-4 text-gray-600 text-lg">
            Kami menyediakan berbagai jenis pagar, tralis, dan kanopi dengan material berkualitas dan
            desain modern. Dikerjakan oleh tenaga ahli berpengalaman.
          </p>

          {/* Fitur */}
          <ul className="mt-6 space-y-3 text-gray-700">
            {[
              "Harga Kompetitif & Transparan",
              "Garansi Kualitas",
              "Pemasangan Profesional",
              "Konsultasi Gratis",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                {item}
              </li>
            ))}
          </ul>

          {/* Tombol */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#kontak" className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all">
              Minta Penawaran
            </a>
            <a href="#produk" className="border border-gray-300 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all">
              Lihat Produk
            </a>
          </div>
        </div>

        {/* Kanan: Gambar */}
        <div className="relative">
          <img
            src="/logo.jpg"
            alt="Pagar & Tralis"
            className="rounded-3xl shadow-lg w-full h-auto"
          />
          {/* Card kecil */}
          <div className="absolute bottom-4 right-4 bg-white shadow-md px-5 py-3 rounded-2xl">
            <p className="text-blue-600 font-bold text-xl">15+</p>
            <p className="text-gray-500 text-sm">Tahun Pengalaman</p>
          </div>
        </div>
      </div>
    </section>
  );
}
