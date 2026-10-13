'use client'

import { useState } from 'react'
import axios, { csrf } from '@/lib/axios' // pastikan sudah ada konfigurasi baseURL ke Laravel API
import Header from '@/app/(app)/Header'

export default function AddProduct() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await csrf() // ambil cookie CSRF

      const res = await axios.post('/api/products', {
        name,
        description,
        price,
      })

      setMessage(res.data.message)
    } catch (error) {
      console.error(error.response?.data || error.message)
      setMessage('Gagal menyimpan produk.')
    }
  }

  return (
  <>
	<Header title="Barang" />
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Tambah Produk</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nama produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Harga"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
	</>
  )
}
