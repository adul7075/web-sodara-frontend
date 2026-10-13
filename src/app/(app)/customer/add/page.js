'use client'

import { useState } from 'react'
import axios, { csrf } from '@/lib/axios' // pastikan sudah ada konfigurasi baseURL ke Laravel API
import Header from '@/app/(app)/Header'

export default function AddProduct() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [customertype, setCustomertype] = useState('')
  const [message, setMessage] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await csrf() // ambil cookie CSRF

      const res = await axios.post('/api/customers', {
        name,
        phone,
        address,
		customertype,
      })

      setMessage(res.data.message)
    } catch (error) {
      console.error(error.response?.data || error.message)
      setMessage('Gagal menyimpan customer.')
    }
  }

  return (
  <>
	<Header title="Customer" />
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Tambah customer</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nama customer"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 w-full"
        />
		<input
          placeholder="Type"
          value={customertype}
          onChange={(e) => setCustomertype(e.target.value)}
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
