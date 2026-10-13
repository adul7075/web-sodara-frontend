"use client";

import { useState, useEffect } from "react";
import Header from '@/app/(app)/Header'
import axios, { csrf } from '@/lib/axios' // pastikan sudah ada konfigurasi baseURL ke Laravel API

export default function ProductTable() {

    const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [message, setMessage] = useState('')
  
  const [editingId, setEditingId] = useState(null)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await csrf()

        if (editingId) {
            // 🔄 UPDATE
            await axios.put(`/api/products/${editingId}`, {
                name,
                description,
                price,
            })

            setMessage('Product berhasil diupdate')
            setEditingId(null)
        } else {
            // ➕ ADD
            await axios.post('/api/products', {
                name,
                description,
                price,
            })

            setMessage('Product berhasil ditambahkan')
        }

        // reset form
        setName('')
        setDescription('')
        setPrice('')

        // refresh data
        await fetchItems()

    } catch (error) {
        console.error(error.response?.data || error.message)
        setMessage('Gagal menyimpan product')
    }
  }

    // State untuk menyimpan data hasil dari API
    const [productsdb, setItems] = useState([]);
    // State untuk menangani status loading
    const [loading, setLoading] = useState(true);
    // State untuk menangani error
    const [error, setError] = useState(null);
	
	// Fungsi async untuk mengambil data
        const fetchItems = async () => {
            try {
                // Ganti dengan URL API Laravel Anda
                const apiUrl = 'http://localhost:8000/api/productsdb';
                
                const response = await axios.get(apiUrl);
                
                // Simpan data dari respons API
                setItems(response.data.data); 
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Gagal memuat data dari server.");
                setLoading(false);
            }
        };

    useEffect(() => {
        
        fetchItems();
    }, []); // Array kosong memastikan ini hanya berjalan SEKALI saat komponen dimuat

    
	const handleEdit = (prod) => {
    setEditingId(prod.id)
    setName(prod.name)
    setDescription(prod.description)
    setPrice(prod.price)
}

const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus product ini?')) return

    try {
        await csrf()
        await axios.delete(`/api/products/${id}`)

        // update UI langsung
        setItems((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
        console.error(error.response?.data || error.message)
        alert('Gagal menghapus product')
    }
}

	
    // Pagination
    const [page, setPage] = useState(1);
    const perPage = 5;

    // Pagination logic
    const lastIndex = page * perPage;
    const firstIndex = lastIndex - perPage;
    const paginatedData = productsdb.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(productsdb.length / perPage);

    

    if (loading) {
        return <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100 p-8 ml-12">Memuat data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    

    return (
        <>
        <Header title="Product" />
        <div className="p-6 ml-12">

            {/* FORM */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">
					{editingId ? "Edit Produk" : "Tambah Produk"}
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Nama product"
                        className="p-2 border rounded-lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Deskripsi product"
                        className="p-2 border rounded-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Price product"
                        className="p-2 border rounded-lg"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    
                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
                    >
                        {editingId ? "Update" : "Tambah"}
                    </button>
					
					{editingId && (
    <button
        type="button"
        onClick={() => {
            setEditingId(null)
            setName('')
            setDescription('')
            setPrice('')
        }}
        className="bg-gray-400 text-white px-4 py-2 rounded-lg"
    >
        Batal
    </button>
)}
					
                </form>
                {message && <p className="mt-4 text-green-600">{message}</p>}
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="text-left py-3 px-4">Produk</th>
                            <th className="text-left py-3 px-4">Deskripsi</th>
                            <th className="text-left py-3 px-4">Price</th>
                            <th className="text-center py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((prod) => (
                            <tr
                                key={prod.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="py-3 px-4">{prod.name}</td>
                                <td className="py-3 px-4">{prod.description}</td>
                                <td className="py-3 px-4">{prod.price}</td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => handleEdit(prod)}
                                        className="px-3 py-1 text-sm bg-yellow-400 text-white rounded-lg mr-2 hover:bg-yellow-500"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(prod.id)}
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* PAGINATION */}
                <div className="flex justify-between p-4">
                    <p className="text-sm text-gray-500">
                        Page {page} of {totalPages}
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={() => page > 1 && setPage(page - 1)}
                            className="px-3 py-1 border rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                            Prev
                        </button>

                        <button
                            onClick={() => page < totalPages && setPage(page + 1)}
                            className="px-3 py-1 border rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
