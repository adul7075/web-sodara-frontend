'use client'

import { useState } from 'react'
import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'
import ClusterBarChart from "@/components/ClusterBarChart";
import ClusterScatter from "@/components/ClusterScatter";
import TransactionLineChart from "@/components/TransactionLineChart";
import KMeansScatter from "@/components/KMeansScatter";

const DashboardSegmentasi = () => {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
	const [showScatter, setShowScatter] = useState(false)

	const runAnalysis = async () => {
    setLoading(true)
    setError(null)
    setShowScatter(false) // reset dulu

    try {
        const res = await axios.get('/api/kmeans')
        setResult(res.data)
        setShowScatter(true) // 🔥 scatter baru boleh tampil
    } catch (err) {
        console.error(err)
        setError('Gagal menjalankan analisis K-Means')
    } finally {
        setLoading(false)
    }
}

    return (
        <>
            <Header title="Dashboard KMeans" />

            <div className="py-6 ml-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* ACTION */}
                    <div className="mb-6">
                        <button
                            onClick={runAnalysis}
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Running Analysis...' : 'Run Analysis'}
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {result && (
                        <>
                            {/* METRIC CARDS */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                                <MetricCard
  title="Total Customers"
  value={result.clusters.reduce((sum, c) => sum + c.length, 0)}
/>

<MetricCard
  title="Jumlah Cluster (K)"
  value={result.clusters.length}
/>

<MetricCard
  title="Total Iterasi"
  value={result.iterations}
/>


                                

                                <MetricCard
                                    title="Current K Value"
                                    value={result.current_k}
                                />

                            </div>

                            {/* CLUSTER INFO */}
                            <div className="bg-white shadow rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Distribusi Cluster
                                </h3>

                                <table className="w-full text-sm border">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-4 py-2">Cluster</th>
                                            <th className="border px-4 py-2">Jumlah Customer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.clusters.map((c, index) => (
  <tr key={index}>
    <td className="border px-4 py-2 text-center">
      Cluster {index + 1}
    </td>
    <td className="border px-4 py-2 text-center">
      {c.length}
    </td>
  </tr>
))}

                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                </div>
            </div>
			
			{showScatter && result && (
  <div className="p-6 bg-white rounded-xl shadow mt-6">
    <h1 className="text-xl font-bold mb-4 py-4 ml-20">
      Visualisasi K-Means Customer
    </h1>
    <KMeansScatter data={result} />
  </div>
)}
						
        </>
    )

}

const MetricCard = ({ title, value }) => (
    <div className="bg-white shadow rounded-lg p-4">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
)

export default DashboardSegmentasi
