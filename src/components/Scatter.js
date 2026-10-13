'use client'

import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'

export default function CustomerScatter({ enabled, k }) {
  const [clusters, setClusters] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!enabled) return // 🔒 KUNCI UTAMA

    setLoading(true)

    fetch('http://localhost:8000/api/kmeans/scatter')
      .then(res => res.json())
      .then(res => {
        const grouped = {}
        res.scatter.forEach(p => {
          if (!grouped[p.cluster]) grouped[p.cluster] = []
          grouped[p.cluster].push(p)
        })
        setClusters(grouped)
      })
      .finally(() => setLoading(false))

  }, [enabled]) // 🔥 dependency HARUS enabled

  // ⛔ JANGAN render apa pun kalau belum klik tombol
  if (!enabled) return null

  if (loading) {
    return <p className="text-gray-500">Loading scatter plot...</p>
  }

  const colors = ['#8884d8', '#82ca9d', '#ff7300', '#ff0000', '#00c49f']

  return (
    <div className="w-full h-[500px] ml-12">
      <h2 className="text-xl font-bold mb-4 ml-12">
        Customer Segmentation (K-Means Scatter Plot) — K = {k}
      </h2>

      <ResponsiveContainer>
        <ScatterChart>
          <XAxis dataKey="x" name="PCA X" />
          <YAxis dataKey="y" name="PCA Y" />
          <Tooltip />
          <Legend />

          {Object.keys(clusters).map((key, i) => (
            <Scatter
              key={key}
              name={`Cluster ${key}`}
              data={clusters[key]}
              fill={colors[i % colors.length]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
