"use client";

import { useState, useEffect } from "react";
import Header from '@/app/(app)/Header'
import axios, { csrf } from '@/lib/axios' // pastikan sudah ada konfigurasi baseURL ke Laravel API
import ProductsSection from "@/components/ProductsSection";
import { useAuth } from "@/hooks/auth";

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
  const { user } = useAuth({ middleware: 'auth' })

  
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
	product_id,

      })

      setMessage(res.data.message)
    } catch (error) {
      console.error(error.response?.data || error.message)
      setMessage('Gagal menyimpan product.')
    }
  }

    // State untuk menyimpan data hasil dari API
    const [ordersdb, setItems] = useState([]);
    // State untuk menangani status loading
    const [loading, setLoading] = useState(true);
    // State untuk menangani error
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fungsi async untuk mengambil data
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

        fetchItems();
    }, []); // Array kosong memastikan ini hanya berjalan SEKALI saat komponen dimuat

    
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
		<ProductsSection />

            {/* FORM */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">
                    Tambah Order {user?.name}!
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-9 gap-4">
                    {/* <input
                        type="text"
                        placeholder="Id Customer"
                        className="p-2 border rounded-lg"
                        value={user?.id_pelanggan}
                        onChange={(e) => setCustomer_id(e.target.value)}
                        
                    />	*/}
					
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
                        placeholder="Product"
                        className="p-2 border rounded-lg"
                        value={product_id}
                        onChange={(e) => setProduct(e.target.value)}
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
                        Tambah
                    </button>
                </form>
                {message && <p className="mt-4 text-green-600">{message}</p>}
            </div>

            
        </div>
        </>
    );
}
