import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale, // 🔥 INI YANG HILANG
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
)
