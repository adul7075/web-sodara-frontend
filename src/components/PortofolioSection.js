"use client";

import React from "react";
import Link from "next/link";

export default function PortfolioSection() {
  const projects = [
    {
      id: 1,
      title: "Pagar Besi",
      image: "/lemari.jpg",
    },
    {
      id: 2,
      title: "Gerbang Rumah",
      image: "/pagar3.jpg",
    },
    {
      id: 3,
      title: "Taman & Lanskap",
      image: "/pagar2.jpg",
    },
    {
      id: 4,
      title: "Kanopi Baja",
      image: "/pagar1.jpg",
    },
    {
      id: 5,
      title: "Proses Las",
      image: "/pagar.jpg",
    },
    {
      id: 6,
      title: "Pagar BRC",
      image: "/pagars.jpg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="text-sm font-medium text-gray-600 uppercase">Galeri</span>
        <h2 className="text-3xl md:text-4xl font-semibold mt-2 text-gray-900">
          Portofolio Proyek Kami
        </h2>
        <p className="text-gray-600 mt-3">
          Lihat hasil kerja kami yang telah dipercaya oleh ratusan pelanggan
        </p>

        {/* Grid Gambar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {projects.map((project) => (
            <Link
              href={`/product/${project.id}`}
              key={project.id}
              className="group relative overflow-hidden rounded-2xl shadow hover:shadow-lg transition-all duration-300 block"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm">{project.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
