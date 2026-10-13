"use client";

import React from "react";
import { ClipboardList, Wrench, Brush, Shield, Clock, ThumbsUp } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: <ClipboardList className="w-6 h-6 text-blue-600" />,
      title: "Survey & Konsultasi",
      description: "Survey lokasi gratis dan konsultasi desain sesuai kebutuhan Anda",
    },
    {
      icon: <Wrench className="w-6 h-6 text-blue-600" />,
      title: "Pembuatan & Pemasangan",
      description: "Pengerjaan profesional oleh tenaga ahli berpengalaman",
    },
    {
      icon: <Brush className="w-6 h-6 text-blue-600" />,
      title: "Finishing Berkualitas",
      description: "Pengecatan dengan cat berkualitas tinggi anti karat dan luntur",
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Garansi Produk",
      description: "Garansi untuk kualitas material dan hasil pengerjaan",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Pengerjaan Tepat Waktu",
      description: "Komitmen menyelesaikan proyek sesuai jadwal yang disepakati",
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-blue-600" />,
      title: "After Sales Service",
      description: "Layanan purna jual dan maintenance untuk kepuasan pelanggan",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Layanan Kami</h2>
        <p className="text-gray-600 mb-10">
          Layanan lengkap dari konsultasi hingga pemasangan dengan standar kualitas terbaik
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start text-left"
            >
              <div className="bg-blue-100 p-3 rounded-lg mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
