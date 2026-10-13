import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, Filter, Users, Package, RefreshCw } from 'lucide-react';

const ClusterPage = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ bulan: 'all', tahun: new Date().getFullYear() });
  const [pesan, setPesan] = useState({ cluster_0: '', cluster_1: '', cluster_2: '' });

  // 1. Fungsi Ambil Data dari Laravel
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/cluster`, { params: filter });
      setData(response.data.data);
      setStats(response.data.avgPerCluster);
    } catch (error) {
      console.error("Gagal mengambil data CPU:", error);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // 2. Fungsi Kirim WhatsApp
  const handleKirimPromo = async () => {
    try {
      await axios.post(`http://localhost:8000/api/kirim-promo`, {
        pesan_cluster_0: pesan.cluster_0,
        pesan_cluster_1: pesan.cluster_1,
        pesan_cluster_2: pesan.cluster_2,
      });
      alert("Promosi Berhasil Dikirim ke WhatsApp!");
    } catch (error) {
      alert("Gagal kirim pesan. Pastikan Server WA (Node.js) menyala.");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f4f7f6' }}>
      <h1><Users size={24} /> Dashboard Segmentasi Pelanggan</h1>

      {/* --- BAGIAN FILTER (Ibarat Control Panel) --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', background: '#fff', padding: '15px', borderRadius: '8px' }}>
        <select onChange={(e) => setFilter({...filter, bulan: e.target.value})}>
          <option value="all">Semua Bulan</option>
          <option value="1">Januari</option>
          {/* ... tambahkan bulan lainnya ... */}
        </select>
        <input type="number" value={filter.tahun} onChange={(e) => setFilter({...filter, tahun: e.target.value})} />
        <button onClick={fetchData} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px' }}>
          <RefreshCw size={16} /> Update Data
        </button>
      </div>

      {/* --- STATISTIK RINGKAS (Ibarat Panel Suhu/Voltage) --- */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: 1, padding: '15px', background: i === 0 ? '#fef3c7' : '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: 0 }}>Cluster {s.cluster}</h3>
            <p>Avg Transaksi: {parseFloat(s.avg_transaksi).toFixed(2)}</p>
            <p>Avg Qty: {parseFloat(s.avg_qty).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* --- TABEL DATA PELANGGAN --- */}
      <table style={{ width: '100%', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#374151', color: '#fff' }}>
          <tr>
            <th style={{ padding: '12px' }}>Nama</th>
            <th>Cluster</th>
            <th>Barang Favorit</th>
            <th>Transaksi</th>
            <th>Total Barang</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}>{item.nama}</td>
              <td>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '12px', 
                  fontSize: '12px',
                  backgroundColor: item.cluster === 0 ? '#fbbf24' : (item.cluster === 1 ? '#94a3b8' : '#d1d5db')
                }}>
                  {item.cluster === 0 ? 'GOLD' : (item.cluster === 1 ? 'SILVER' : 'BRONZE')}
                </span>
              </td>
              <td><Package size={14} /> {item.barang_favorit}</td>
              <td>{item.total_transaksi}x</td>
              <td>{item.total_qty} Unit</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- PANEL BROADCAST WHATSAPP --- */}
      <div style={{ marginTop: '30px', background: '#dcfce7', padding: '20px', borderRadius: '8px' }}>
        <h3><Send size={20} /> Kirim Promo Blast (WhatsApp)</h3>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label>Pesan Cluster GOLD (Loyal):</label>
            <textarea style={{ width: '100%' }} onChange={(e) => setPesan({...pesan, cluster_0: e.target.value})} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Pesan Cluster SILVER (Menengah):</label>
            <textarea style={{ width: '100%' }} onChange={(e) => setPesan({...pesan, cluster_1: e.target.value})} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Pesan Cluster BRONZE (Pasif):</label>
            <textarea style={{ width: '100%' }} onChange={(e) => setPesan({...pesan, cluster_2: e.target.value})} />
          </div>
        </div>
        <button onClick={handleKirimPromo} style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Kirim ke Semua Pelanggan
        </button>
      </div>
    </div>
  );
};

export default ClusterPage;