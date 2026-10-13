"use client";

import React from "react";

export default function ProductSection() {
  const products = [
    {
      id: 1,
      title: "Pagar Minimalis",
      description:
        "Pagar dengan desain minimalis modern, cocok untuk hunian kontemporer",
      features: ["Anti Karat", "Desain Custom", "Pemasangan Cepat"],
      price: "Mulai dari Rp 250.000/meter",
      image:
        "/pagar.jpg",
    },
    {
      id: 2,
      title: "Tralis Jendela & Pintu",
      description:
        "Tralis besi untuk keamanan jendela dan pintu dengan berbagai model",
      features: ["Berbagai Model", "Material Kuat", "Cat Anti Luntur"],
      price: "Mulai dari Rp 150.000/meter",
      image:
        "/pagarss.jpg",
    },
    {
      id: 3,
      title: "Kanopi Baja Ringan",
      description:
        "Kanopi dengan rangka baja ringan dan atap polikarbonat/spandek",
      features: ["Tahan Lama", "Anti Bocor", "Berbagai Warna"],
      price: "Mulai dari Rp 350.000/m²",
      image:
        "/pagar5.JPG",
    },
    {
      id: 4,
      title: "Pagar BRC & Wiremesh",
      description:
        "Pagar kawat BRC dan wiremesh untuk area perimeter dan keamanan",
      features: ["Ekonomis", "Kokoh", "Instalasi Mudah"],
      price: "Mulai dari Rp 120.000/meter",
      image:
        "/pagar2.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-sm font-medium text-blue-600 uppercase bg-blue-100 px-3 py-1 rounded-full">
          Produk Kami
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-gray-900">
          Berbagai Pilihan Produk Berkualitas
        </h2>
        <p className="text-gray-600 mt-3">
          Kami menyediakan berbagai jenis produk pagar, tralis, dan kanopi dengan material terbaik
        </p>

        {/* Grid produk */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 text-left"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <ul className="text-sm text-blue-700 mb-3 list-disc list-inside space-y-1">
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <hr className="my-3" />
                <p className="text-blue-600 text-sm font-medium">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
