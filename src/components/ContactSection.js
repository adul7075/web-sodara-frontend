"use client";   // ⬅️ Tambahkan baris ini paling atas
import React, { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import axios, { csrf } from '@/lib/axios' // pastikan sudah ada konfigurasi baseURL ke Laravel API

export default function ContactSection() {
  /*const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });*/
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [pesan, setPesan] = useState('')
  const [message, setMessage] = useState('')

  /*const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Pesan berhasil dikirim!");
    setForm({ name: "", phone: "", email: "", message: "" });
  };*/
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await csrf() // ambil cookie CSRF

      const res = await axios.post('/api/pesans', {
        name,
        phone,
        email,
		pesan,
      })

      setMessage(res.data.message)
    } catch (error) {
      console.error(error.response?.data || error.message)
      setMessage('Gagal menyimpan Pesan.')
    }
  }

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Hubungi Kami
          </h2>
          <p className="text-gray-600">
            Dapatkan konsultasi gratis dan penawaran terbaik untuk proyek Anda
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white shadow-md rounded-lg p-8 border border-gray-100">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Kirim Pesan
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Isi form di bawah ini dan kami akan segera menghubungi Anda
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    /*value={form.name}
                    onChange={handleChange}*/
					value={name}
					onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama Anda"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    name="phone"
                    /*value={form.phone}
                    onChange={handleChange}*/
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
                    placeholder="08xx-xxxx-xxxx"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  /*value={form.email}
                  onChange={handleChange}*/
				  value={email}
				  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Pesan</label>
                <textarea
                  name="message"
                  /*value={form.message}
                  onChange={handleChange}*/
				  value={pesan}
				  onChange={(e) => setPesan(e.target.value)}
                  rows="4"
                  placeholder="Ceritakan kebutuhan Anda..."
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0f1623] hover:bg-blue-900 text-white py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <Send size={16} /> Kirim Pesan
              </button>
            </form>
			{message && <p className="mt-4 text-green-600">{message}</p>}
          </div>

          {/* Kontak Info */}
          <div className="space-y-4">
            <div className="bg-white shadow-md border border-gray-100 rounded-lg p-5 flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Telepon</p>
                <p className="text-gray-500 text-sm">0813-8397-4625</p>
              </div>
            </div>

            <div className="bg-white shadow-md border border-gray-100 rounded-lg p-5 flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Email</p>
                <p className="text-gray-500 text-sm">info@pagartralis.com</p>
              </div>
            </div>

            <div className="bg-white shadow-md border border-gray-100 rounded-lg p-5 flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-700">Alamat</p>
                <p className="text-gray-500 text-sm">
                  Jl. Talun No. 21 Kab. Bandung Jawa Barat 40394
                </p>
              </div>
            </div>

            <div className="bg-blue-600 text-white shadow-md rounded-lg p-5">
              <h4 className="font-semibold mb-3">Jam Operasional</h4>
              <ul className="text-sm space-y-2">
                <li className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span>08:00 - 17:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sabtu</span>
                  <span>08:00 - 14:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Minggu</span>
                  <span>Tutup</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
