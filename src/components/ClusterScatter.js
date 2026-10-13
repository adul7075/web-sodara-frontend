'use client'

import { Scatter } from 'react-chartjs-2'

export default function ClusterScatter({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <p className="text-sm text-gray-500">Data scatter belum tersedia</p>
  }

  const datasets = Object.keys(data).map((cluster) => ({
    label: `Cluster ${cluster}`,
    data: data[cluster].map(c => ({
      x: c.total_transaksi,
      y: c.total_spending,
    })),
  }))

  return <Scatter data={{ datasets }} />
}
