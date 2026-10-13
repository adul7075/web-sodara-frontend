// ProductDetail.js
'use client'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  MessagesSquare,
  TruckElectric,
} from "lucide-react";

export default function ProductDetail({image, title, price, description}) {
  const [selectedFilter, setSelectedFilter] = useState('Berbagai Model')

  return (
    <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto">
	
		{/* TOMBOL BACK */}
      <Link href="/"
        className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm text-sm"
      >
        ← Kembali
      </Link>

      {/* GRID: Gambar + Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ---- Gambar Produk ---- */}
        <div className="w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-[360px] object-cover rounded-lg shadow"
          />
        </div>

        {/* ---- Detail Produk ---- */}
        <div>
          <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">Besi</span>

          <h1 className="text-3xl font-bold mt-3">{title}</h1>

          <p className="text-blue-600 font-semibold mt-2">
            Mulai dari Rp {price}/meter
          </p>

          <p className="text-gray-600 mt-3">
			{description}
          </p>

          {/* FILTER UNGGULAN */}
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Fitur Unggulan</h3>

            <div className="space-y-2">
              {['Berbagai Model', 'Material Kuat', 'Cat Anti Luntur'].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="filter"
                    checked={selectedFilter === item}
                    onChange={() => setSelectedFilter(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SPESIFIKASI */}
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Spesifikasi Teknis</h3>

            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Material</span>
                <strong>Besi Solid</strong>
              </li>

              <li className="flex justify-between">
                <span>Diameter</span>
                <strong>12–16 mm</strong>
              </li>

              <li className="flex justify-between">
                <span>Model</span>
                <strong>Custom / Standar</strong>
              </li>

              <li className="flex justify-between">
                <span>Finishing</span>
                <strong>Cat Powder Coating</strong>
              </li>

              <li className="flex justify-between">
                <span>Garansi</span>
                <strong>3 tahun</strong>
              </li>
            </ul>
          </div>

          {/* KEUNTUNGAN */}
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Keuntungan Produk</h3>

            <ul className="list-disc ml-5 text-sm space-y-1">
              <li>Garansi enam tahun produk</li>
              <li>Tidak mengganggu penampilan estetik</li>
              <li>Bisa dicat sesuai keinginan</li>
              <li>Material kuat</li>
              <li>Instalasi cepat</li>
            </ul>
          </div>

          {/* BUTTON */}
	      {/*
		  <div className="flex gap-3 mt-6">
            <button className="bg-black text-white px-6 py-3 rounded-lg">
              Hubungi Kami
            </button>

            <button className="border px-6 py-3 rounded-lg">
              Minta Penawaran
            </button>
          </div>
		  */}
        </div>
      </div>

      {/* ---- BENEFIT DI BAWAH ---- */}
      <div className="grid grid-cols-1 md:grid-cols-3 text-center mt-16 gap-10">

        <div className="flex flex-col items-center text-center">
          <ShieldCheck size={32} className="text-indigo-600"/>
          <h4 className="font-semibold mt-2">Garansi Resmi</h4>
          <p className="text-gray-500 text-sm">Garansi konstruksi dan material</p>
        </div>

        <div className="flex flex-col items-center text-center">
		  <MessagesSquare size={32} className="text-indigo-600"/>
          <h4 className="font-semibold mt-2">Gratis Konsultasi</h4>
          <p className="text-gray-500 text-sm">Survey dan konsultasi tanpa biaya</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <TruckElectric size={32} className="text-indigo-600"/>
          <h4 className="font-semibold mt-2">Pemasangan Cepat</h4>
          <p className="text-gray-500 text-sm">Dikerjakan oleh tim profesional</p>
        </div>

      </div>
    </div>
  )
}
