'use client'

import { Bar } from 'react-chartjs-2'

export default function ClusterBarChart({ clusters }) {
  const data = {
    labels: clusters.map(c => `Cluster ${c.cluster}`),
    datasets: [
      {
        label: 'Jumlah Customer',
        data: clusters.map(c => c.count),
      },
    ],
  }

  return <Bar data={data} />
}
