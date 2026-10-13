"use client";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function KMeansScatter() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/kmeans/clustering", {
        withCredentials: true,
      })
      .then((res) => {
        const { clusters, centroids } = res.data;

        const colors = ["#ef4444", "#3b82f6", "#10b981"];

        const jitter = () => (Math.random() - 0.5) * 0.02;

        const datasets = clusters.map((cluster, i) => ({
          label: `Cluster ${i + 1}`,
          data: cluster.map((point) => ({
            x: point[0] + jitter(),
            y: point[2] + jitter(),
          })),
          backgroundColor: colors[i],
          pointRadius: 6,
          pointHoverRadius: 9,
        }));

        datasets.push({
          label: "Centroid",
          data: centroids.map((c) => ({
            x: c[0],
            y: c[2],
          })),
          backgroundColor: "#000",
          pointStyle: "rectRot",
          pointRadius: 12,
        });

        setChartData({ datasets });
      });
  }, []);

  if (!chartData) return <p>Loading grafik K-Means...</p>;

  return (
  <div className="py-4 ml-20">
    <Scatter
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
        scales: {
          x: {
            min: -0.05,
            max: 1.05,
            title: {
              display: true,
              text: "Total Transaksi (Normalized)",
            },
          },
          y: {
            min: -0.05,
            max: 1.05,
            title: {
              display: true,
              text: "Total Spending (Normalized)",
            },
          },
        },
      }}
    />
	</div>
  );
}
