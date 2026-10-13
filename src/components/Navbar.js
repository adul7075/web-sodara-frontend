"use client";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'



export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth({ middleware: 'guest' })

  // Deteksi ketika user scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto py-3 px-6 flex items-center justify-between">
        {/* Kiri - Logo dan Nama */}
        <div className="flex items-center space-x-3">
          <div className="bg-red-600 text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-lg">
            PT
          </div>
          <div>
            <h1 className="font-semibold text-gray-800 text-lg">Pagar Tralis</h1>
            <p className="text-sm text-gray-500 -mt-1">
              Berkualitas & Terpercaya
            </p>
          </div>
        </div>

        {/* Tengah - Menu Navigasi */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="#beranda" className="hover:text-blue-600 transition">
            Beranda
          </a>
          <a href="#produk" className="hover:text-blue-600 transition">
            Produk
          </a>
          <a href="#layanan" className="hover:text-blue-600 transition">
            Layanan
          </a>
          <a href="#galeri" className="hover:text-blue-600 transition">
            Galeri
          </a>
          <a href="#kontak" className="hover:text-blue-600 transition">
            Kontak
          </a>
        </nav>

        {/* Kanan - Telepon dan Tombol */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-700">
            <Phone className="w-5 h-5 mr-2 text-blue-600" />
            <span>0813-8397-4625</span>
          </div>
          <a className="bg-gray-900 text-white px-2 py-1 rounded-lg hover:bg-gray-800 transition">
            Konsultasi Gratis
          </a>
        </div>
		
		<div className="flex items-center space-x-3">
            {user ? (
                <Link
                    href="/dashboard"
                    className="px-4 py-2 bg-gray-100 hover:bg-green-200 rounded-lg shadow-sm text-sm"
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm text-sm"
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm text-sm"
                    >
                        Register
                    </Link>
                </>
            )}
        </div>
      </div>
    </header>
  );
}
