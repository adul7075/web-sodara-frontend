"use client";

import { useState, useEffect } from "react";
import Header from '@/app/(app)/Header'
import axios, { csrf } from '@/lib/axios' // pastikan sudah ada konfigurasi baseURL ke Laravel API

export default function OrderTable() {

    const [customer_id, setCustomer_id] = useState('')
  const [tanggal_transaksi, setTanggal_transaksi] = useState('')
  const [length, setLength] = useState('')
  const [height, setHeight] = useState('')
  const [luas, setLuas] = useState('')
  const [initial_price_per_m, setInitial_price_per_m] = useState('')
  const [final_price_per_m, setFinal_price_per_m] = useState('')
  const [total_price, setTotal_price] = useState('')
  const [statusjob, setStatusjob] = useState('')
  const [product_id, setProduct] = useState('')
  const [message, setMessage] = useState('')
  
  const [editingId, setEditingId] = useState(null)


  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await csrf()

        const payload = {
            customer_id,
            tanggal_transaksi,
            length,
            height,
            luas,
            initial_price_per_m,
            final_price_per_m,
            total_price,
            statusjob,
            product_id,
        }

        if (editingId) {
            // UPDATE
            const res = await axios.put(`/api/orders/${editingId}`, payload)
            setMessage(res.data.message || 'Order berhasil diupdate')

            // update data di tabel tanpa reload
            setItems(prev =>
                prev.map(item =>
                    item.id === editingId ? { ...item, ...payload } : item
                )
            )
			await fetchItems() // ?? WAJIB

            setEditingId(null)
        } else {
            // TAMBAH
            const res = await axios.post('/api/orders', payload)
            setMessage(res.data.message || 'Order berhasil ditambahkan')

            /*setItems(prev => [...prev, res.data.data])*/
			await fetchItems() // ?? INI KUNCINYA
        }

		//setMessage(res.data.message)
        resetForm()
    } catch (error) {
        console.error(error.response?.data || error.message)
        setMessage('Gagal menyimpan order.')
    }
  }

    // State untuk menyimpan data hasil dari API
    const [ordersdb, setItems] = useState([]);
    // State untuk menangani status loading
    const [loading, setLoading] = useState(true);
    // State untuk menangani error
    const [error, setError] = useState(null);
	
	const fetchItems = async () => {
            try {
                // Ganti dengan URL API Laravel Anda
                const apiUrl = 'http://localhost:8000/api/ordersdb';
                
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
        // Fungsi async untuk mengambil data
        

        fetchItems();
    }, []); // Array kosong memastikan ini hanya berjalan SEKALI saat komponen dimuat

    
	const handleEdit = (order) => {
    setEditingId(order.id)
    setCustomer_id(order.customer_id)
    setTanggal_transaksi(order.tanggal_transaksi)
    setProduct(order.product_id)
    setLength(order.length)
    setHeight(order.height)
    setLuas(order.luas)
    setInitial_price_per_m(order.initial_price_per_m)
    setFinal_price_per_m(order.final_price_per_m)
    setTotal_price(order.total_price)
    setStatusjob(order.statusjob)

    window.scrollTo({ top: 0, behavior: 'smooth' })
}


const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus order ini?')) return

    try {
        await csrf()
        await axios.delete(`/api/orders/${id}`)

        setItems(prev => prev.filter(item => item.id !== id))
        setMessage('Order berhasil dihapus')
    } catch (error) {
        console.error(error)
        setMessage('Gagal menghapus order')
    }
}

const resetForm = () => {
    setEditingId(null)
    setCustomer_id('')
    setTanggal_transaksi('')
    setProduct('')
    setLength('')
    setHeight('')
    setLuas('')
    setInitial_price_per_m('')
    setFinal_price_per_m('')
    setTotal_price('')
    setStatusjob('')
}

	
    // Pagination
    const [page, setPage] = useState(1);
    const perPage = 5;

    // Pagination logic
    const lastIndex = page * perPage;
    const firstIndex = lastIndex - perPage;
    const paginatedData = ordersdb.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(ordersdb.length / perPage);

    

    if (loading) {
        return <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100 p-8 ml-12">Memuat data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    

    return (
        <>
        <Header title="Order" />
        <div className="p-6 ml-12">

            {/* FORM */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">
    {editingId ? 'Edit Order' : 'Tambah Order'}
</h2>


                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-9 gap-4">
                    <input
                        type="text"
                        placeholder="Id Customer"
                        className="p-2 border rounded-lg"
                        value={customer_id}
                        onChange={(e) => setCustomer_id(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Tanggal Order"
                        className="p-2 border rounded-lg"
                        value={tanggal_transaksi}
                        onChange={(e) => setTanggal_transaksi(e.target.value)}
                        required
                    />
					<input
                        type="text"
                        placeholder="Product"
                        className="p-2 border rounded-lg"
                        value={product_id}
                        onChange={(e) => setProduct(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Lebar"
                        className="p-2 border rounded-lg"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        required
                    />
					<input
                        type="text"
                        placeholder="Panjang"
                        className="p-2 border rounded-lg"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Luas"
                        className="p-2 border rounded-lg"
                        value={luas}
                        onChange={(e) => setLuas(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Harga Awal"
                        className="p-2 border rounded-lg"
                        value={initial_price_per_m}
                        onChange={(e) => setInitial_price_per_m(e.target.value)}
                        required
                    />
		    <input
                        type="text"
                        placeholder="Harga Final"
                        className="p-2 border rounded-lg"
                        value={final_price_per_m}
                        onChange={(e) => setFinal_price_per_m(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Total Harga"
                        className="p-2 border rounded-lg"
                        value={total_price}
                        onChange={(e) => setTotal_price(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Status"
                        className="p-2 border rounded-lg"
                        value={statusjob}
                        onChange={(e) => setStatusjob(e.target.value)}
                        required
                    />
		                        
                    <button
    type="submit"
    className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
>
    {editingId ? 'Update' : 'Tambah'}
</button>

{editingId && (
    <button
        type="button"
        onClick={() => {
            setEditingId(null)
			setCustomer_id('')
			setTanggal_transaksi('')
			setProduct('')
			setLength('')
			setHeight('')
			setLuas('')
			setInitial_price_per_m('')
			setFinal_price_per_m('')
			setTotal_price('')
			setStatusjob('')
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
                            <th className="text-left py-3 px-4">Customer</th>
                            <th className="text-left py-3 px-4">Tanggal</th>
                            <th className="text-left py-3 px-4">Lebar (m)</th>
			                <th className="text-left py-3 px-4">Tinggi (m)</th>
                            <th className="text-left py-3 px-4">Luas (m)</th>
                            <th className="text-left py-3 px-4">Harga Awal</th>
	 		                <th className="text-left py-3 px-4">Harga Final</th>
                            <th className="text-left py-3 px-4">Total Harga</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-center py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((prod) => (
                            <tr
                                key={prod.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="py-3 px-4">{prod.customer_id}</td>
                                <td className="py-3 px-4">{prod.tanggal_transaksi}</td>
                                <td className="py-3 px-4">{prod.length}</td>
				                <td className="py-3 px-4">{prod.height}</td>
                                <td className="py-3 px-4">{prod.luas}</td>
				                <td className="py-3 px-4">{prod.initial_price_per_m.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', })}</td>
                                <td className="py-3 px-4">{prod.final_price_per_m.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', })}</td>
                                <td className="py-3 px-4">{prod.total_price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', })}</td>
				                <td className="py-3 px-4">{prod.statusjob}</td>
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
