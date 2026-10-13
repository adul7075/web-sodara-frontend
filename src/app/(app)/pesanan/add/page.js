'use client'

import { useState } from 'react'
import axios, { csrf } from '@/lib/axios' // pastikan sudah ada konfigurasi baseURL ke Laravel API
import Header from '@/app/(app)/Header'

export default function AddProduct() {
  const [customer_id, setCustomer_id] = useState('')
  const [tanggal_transaksi, setTanggal_transaksi] = useState('')
  const [length, setLength] = useState('')
  const [height, setHeight] = useState('')
  const [luas, setLuas] = useState('')
  const [initial_price_per_m, setInitial_price_per_m] = useState('')
  const [final_price_per_m, setFinal_price_per_m] = useState('')
  const [total_price, setTotal_price] = useState('')
  const [statusjob, setStatusjob] = useState('')
  const [product, setProduct] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await csrf() // ambil cookie CSRF

      const res = await axios.post('/api/orders', {
        customer_id,
		tanggal_transaksi,
        length,
        height,
		luas,
		initial_price_per_m,
		final_price_per_m,
		total_price,
		statusjob,
		product,
		
      })

      setMessage(res.data.message)
    } catch (error) {
      console.error(error.response?.data || error.message)
      setMessage('Gagal menyimpan order.')
    }
  }

  return (
	<>
    <Header title="Pesanan" />
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Tambah Order</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="ID pelanggan"
          value={customer_id}
          onChange={(e) => setCustomer_id(e.target.value)}
          className="border p-2 w-full"
        />
		<input
          type="text"
          placeholder="Tanggal Transaksi"
          value={tanggal_transaksi}
          onChange={(e) => setTanggal_transaksi(e.target.value)}
          className="border p-2 w-full"
        />
		<input
          type="text"
          placeholder="product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          placeholder="panjang"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          placeholder="tinggi"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="border p-2 w-full"
        />
		<input
          type="text"
          placeholder="luas"
          value={luas}
          onChange={(e) => setLuas(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          placeholder="harga awal"
          value={initial_price_per_m}
          onChange={(e) => setInitial_price_per_m(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Harga akhir"
          value={final_price_per_m}
          onChange={(e) => setFinal_price_per_m(e.target.value)}
          className="border p-2 w-full"
        />
		<input
          placeholder="total harga"
          value={total_price}
          onChange={(e) => setTotal_price(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          placeholder="status"
          value={statusjob}
          onChange={(e) => setStatusjob(e.target.value)}
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
