import React from "react";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f1623] text-gray-300 py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
        {/* Logo dan Deskripsi */}
        <div>
          <div className="flex items-center mb-4">
            <div className="bg-blue-600 text-white font-bold px-3 py-1 rounded-md mr-2">
              PT
            </div>
            <h2 className="text-lg font-semibold text-white">Pagar Tralis</h2>
          </div>
          <p className="text-sm leading-relaxed">
            Solusi terpercaya untuk kebutuhan pagar, tralis, dan kanopi
            berkualitas tinggi dengan harga kompetitif.
          </p>
        </div>

        {/* Produk */}
        <div>
          <h3 className="text-white font-semibold mb-3">Produk</h3>
          <ul className="space-y-2 text-sm">
            <li>Pagar Minimalis</li>
            <li>Tralis Jendela</li>
            <li>Kanopi</li>
            <li>Pagar BRC</li>
          </ul>
        </div>

        {/* Layanan */}
        <div>
          <h3 className="text-white font-semibold mb-3">Layanan</h3>
          <ul className="space-y-2 text-sm">
            <li>Konsultasi</li>
            <li>Survey Gratis</li>
            <li>Pemasangan</li>
            <li>Maintenance</li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-white font-semibold mb-3">Kontak</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> 0813-8397-4625
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> info@pagartralis.com
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} />{" "}
              <span>
                Jl. Talun No. 21
                <br />
                Kab. Bandung Jawa Barat 40394
              </span>
            </li>
          </ul>

          {/* Sosial Media */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
              <Facebook size={16} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-6">
        © 2025 Pagar Tralis. All rights reserved.
      </div>
    </footer>
  );
}
