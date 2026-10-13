'use client'

import { Line } from 'react-chartjs-2'

export default function TransactionLineChart({ yearly }) {
  if (!yearly || yearly.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Data transaksi tahunan belum tersedia
      </p>
    )
  }

  const data = {
    labels: yearly.map(y => y.year),
    datasets: [
      {
        label: 'Total Transaksi',
        data: yearly.map(y => y.total),
      },
    ],
  }

  return <Line data={data} />
}
