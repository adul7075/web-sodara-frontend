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

        // 🔥 DATA CLUSTER (TANPA JITTER)
        const datasets = clusters.map((cluster, i) => ({
          label: `Cluster ${i + 1}`,
          data: cluster.map((point) => ({
            x: Number(point[0]),
            y: Number(point[2]),
          })),
          backgroundColor: colors[i],
          pointRadius: 5,
          pointHoverRadius: 7,
        }));

        // 🔥 CENTROID
        datasets.push({
          label: "Centroid",
          data: centroids.map((c) => ({
            x: Number(c[0]),
            y: Number(c[2]),
          })),
          backgroundColor: "#000",
          pointStyle: "rectRot",
          pointRadius: 10,
          pointHoverRadius: 12,
        });

        setChartData({ datasets });
      })
      .catch((err) => {
        console.error("Error fetch K-Means:", err);
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
            legend: {
              position: "top",
              labels: {
                usePointStyle: true,
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `(${context.raw.x.toFixed(2)}, ${context.raw.y.toFixed(2)})`;
                },
              },
            },
          },
          scales: {
            x: {
              min: 0,
              max: 1,
              title: {
                display: true,
                text: "Total Transaksi (Normalized)",
              },
              grid: {
                display: true,
              },
              ticks: {
                stepSize: 0.1,
              },
            },
            y: {
              min: 0,
              max: 1,
              title: {
                display: true,
                text: "Total Spending (Normalized)",
              },
              grid: {
                display: true,
              },
              ticks: {
                stepSize: 0.1,
              },
            },
          },
        }}
      />
    </div>
  );
}