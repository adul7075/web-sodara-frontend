"use client";

import { useState, useEffect } from "react";
import Header from '@/app/(app)/Header'
import axios, { csrf } from '@/lib/axios' // pastikan sudah ada konfigurasi baseURL ke Laravel API

export default function CustomerTable() {

    const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [customertype, setCustomertype] = useState('')
  const [message, setMessage] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await csrf() // ambil cookie CSRF
	  
	  let res

      /*const res = await axios.post('/api/customers', {
        name,
        phone,
        address,
		customertype,
      })*/
	  if (editingId) {
            // 🔄 UPDATE
            res = await axios.put(`/api/customers/${editingId}`, {
                name,
                phone,
                address,
                customertype,
            })

            // ✅ UPDATE STATE
            setItems((prev) =>
                prev.map((item) =>
                    item.id === editingId ? res.data.data : item
                )
            )
			
			await fetchItems() // ?? WAJIB

            setEditingId(null)
        } else {
            // ➕ ADD
            res = await axios.post('/api/customers', {
                name,
                phone,
                address,
                customertype,
            })
			 /*if (res.data?.data) {
				setItems((prev) => [...prev, res.data.data])
			}*/
			await fetchItems() // ?? INI KUNCINYA
		}
	  

      setMessage(res.data.message)
	  // reset form
        setName('')
        setPhone('')
        setAddress('')
        setCustomertype('')
	 

	  
    } catch (error) {
      console.error(error.response?.data || error.message)
      setMessage('Gagal menyimpan customer.')
    }
  }

    // State untuk menyimpan data hasil dari API
    const [customersdb, setItems] = useState([]);
    // State untuk menangani status loading
    const [loading, setLoading] = useState(true);
    // State untuk menangani error
    const [error, setError] = useState(null);
	
	// Fungsi async untuk mengambil data
        const fetchItems = async () => {
            try {
                // Ganti dengan URL API Laravel Anda
                const apiUrl = 'http://localhost:8000/api/customersdb';
                
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
	
	


    /* Data pelanggan
    const [customers, setCustomers] = useState([
        { id: 1, name: "Malik Aziz", email: "malik@gmail.com" },
        { id: 2, name: "Aisyah Putri", email: "aisyah@example.com" },
        { id: 3, name: "Dian Putra", email: "dian@sample.com" },
        { id: 4, name: "Rizki Fajar", email: "rizki@mail.com" },
        { id: 5, name: "Siti Nur", email: "siti@mail.com" },
        { id: 6, name: "Mega Rahayu", email: "mega@mail.com" },
    ]); */

    // Form
    //const [form, setForm] = useState({ name: "", email: "" });
    const [editingId, setEditingId] = useState(null);

    // Pagination
    const [page, setPage] = useState(1);
    const perPage = 5;

    /*const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name.trim() || !form.email.trim()) return;

        if (editingId) {
            setCustomers(
                customers.map((c) =>
                    c.id === editingId ? { ...c, ...form } : c
                )
            );
            setEditingId(null);
        } else {
            setCustomers([
                ...customers,
                { id: Date.now(), name: form.name, email: form.email },
            ]);
        }

        setForm({ name: "", email: "" });
    };*/

    const handleEdit = (cust) => {
        /*setEditingId(customer.id);
        setForm({ name: customer.name, email: customer.email });*/
		setEditingId(cust.id)
		setName(cust.name)
		setPhone(cust.phone)
		setAddress(cust.address)
		setCustomertype(cust.customer_type)
    };

    /*const handleDelete = (id) => {
        setCustomers(customers.filter((c) => c.id !== id));
    };*/
	const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus customer ini?')) return;

    try {
        await csrf(); // ambil CSRF cookie (jika pakai Sanctum)

        await axios.delete(`/api/customers/${id}`);

        // Update state tanpa reload
        setItems(customersdb.filter((cust) => cust.id !== id));
    } catch (error) {
        console.error(error.response?.data || error.message);
        alert('Gagal menghapus customer');
    }
};


    // Pagination logic
    const lastIndex = page * perPage;
    const firstIndex = lastIndex - perPage;
    const paginatedData = customersdb.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(customersdb.length / perPage);

    

    if (loading) {
        return <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100 p-8 ml-12">Memuat data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    

    return (
        <>
        <Header title="Pelanggan" />
        <div className="p-6 ml-12">
            {/* TITLE 
            <h1 className="text-2xl font-semibold mb-6">Pelanggan</h1>*/}

            {/* FORM */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
                <h2 className="text-lg font-semibold mb-4">
                    {editingId ? "Edit Pelanggan" : "Tambah Pelanggan"}
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <input
                        type="text"
                        placeholder="Nama pelanggan"
                        className="p-2 border rounded-lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Telepon pelanggan"
                        className="p-2 border rounded-lg"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Alamat pelanggan"
                        className="p-2 border rounded-lg"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Status pelanggan"
                        className="p-2 border rounded-lg"
                        value={customertype}
                        onChange={(e) => setCustomertype(e.target.value)}
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
            setPhone('')
            setAddress('')
            setCustomertype('')
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
                            <th className="text-left py-3 px-4">Nama</th>
                            <th className="text-left py-3 px-4">Telepon</th>
                            <th className="text-left py-3 px-4">Alamat</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-center py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((cust) => (
                            <tr
                                key={cust.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="py-3 px-4">{cust.name}</td>
                                <td className="py-3 px-4">{cust.phone}</td>
                                <td className="py-3 px-4">{cust.address}</td>
                                <td className="py-3 px-4">{cust.customer_type}</td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => handleEdit(cust)}
                                        className="px-3 py-1 text-sm bg-yellow-400 text-white rounded-lg mr-2 hover:bg-yellow-500"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cust.id)}
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
