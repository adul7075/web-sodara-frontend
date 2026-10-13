'use client'

import { useEffect, useState, useMemo } from 'react'
import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'

const ITEMS_PER_PAGE = 10

const SumTransaksi = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await axios.get('/api/orders/summary/customer')
                setData(res.data.data)
            } catch (err) {
                console.error(err)
                setError('Gagal memuat data rekap')
            } finally {
                setLoading(false)
            }
        }

        fetchSummary()
    }, [])

    // 🔍 Filter Search
    const filteredData = useMemo(() => {
        return data.filter((row) =>
            String(row.customer_id)
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    }, [data, search])

    // 📄 Pagination
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    // 📤 Export CSV
    const exportCSV = () => {
        const headers = [
            'customer_name',
            'total_transaksi',
            'total_luas',
            'total_spending',
            'avg_price',
			'cluster',
        ]

        const rows = filteredData.map((row) =>
            headers.map((h) => row[h]).join(',')
        )

        const csvContent =
            headers.join(',') + '\n' + rows.join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'customer_transaction_summary.csv')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <>
            <Header title="Rekap Transaksi (Dataset K-Means)" />

            <div className="py-4 ml-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">

                            {/* HEADER ACTION */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Rekap Transaksi per Customer
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Total Customer: <b>{filteredData.length}</b>
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Cari Customer ID..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value)
                                            setCurrentPage(1)
                                        }}
                                        className="border rounded-lg px-3 py-2 text-sm"
                                    />

                                    <button
                                        onClick={exportCSV}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                                    >
                                        Export CSV
                                    </button>
                                </div>
                            </div>

                            {loading && <p>Memuat data...</p>}
                            {error && <p className="text-red-500">{error}</p>}

                            {!loading && !error && (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm border">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-4 py-2 border">Nama Customer</th>
                                                    <th className="px-4 py-2 border">Total Transaksi</th>
                                                    <th className="px-4 py-2 border">Total Luas</th>
                                                    <th className="px-4 py-2 border">Total Spending</th>
                                                    <th className="px-4 py-2 border">Avg Price / m</th>
													<th className="px-4 py-2 border">Cluster</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedData.map((row) => (
                                                    <tr key={row.customer_id} className="hover:bg-gray-50">
                                                        <td className="px-4 py-2 border text-center">
                                                            {row.customer_name}
                                                        </td>
                                                        <td className="px-4 py-2 border text-center">
                                                            {row.total_transaksi}
                                                        </td>
                                                        <td className="px-4 py-2 border text-right">
                                                            {Number(row.total_luas).toFixed(2)}
                                                        </td>
                                                        <td className="px-4 py-2 border text-right">
                                                            {Number(row.total_spending).toLocaleString('id-ID', {
                                                                style: 'currency',
                                                                currency: 'IDR',
                                                            })}
                                                        </td>
                                                        <td className="px-4 py-2 border text-right">
                                                            {Number(row.avg_price).toLocaleString('id-ID')}
                                                        </td>
														<td className="px-4 py-2 border text-center">
                                                            {row.cluster}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* PAGINATION */}
                                    <div className="flex justify-center gap-2 mt-6">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage((p) => p - 1)}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
                                        >
                                            Prev
                                        </button>

                                        <span className="px-3 py-1 text-sm">
                                            Page {currentPage} of {totalPages}
                                        </span>

                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage((p) => p + 1)}
                                            className="px-3 py-1 border rounded disabled:opacity-50"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SumTransaksi
