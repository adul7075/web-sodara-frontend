"use client";

import { useState } from "react";
import axios from "axios";

export default function PromoForm() {
  const [form, setForm] = useState({
  cluster: "",
  type: "discount",
  product_id: "",
  discount: "",
  cross_product_id: "",
  start_date: "",
  end_date: "",
});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/api/promo",
        form,
        { withCredentials: true }
      );

      alert("Promo berhasil disimpan 🚀");
      setForm({
        cluster: "",
  type: "discount",
  product_id: "",
  discount: "",
  cross_product_id: "",
  start_date: "",
  end_date: "",
      });
    } catch (err) {
  console.log(err.response?.data);
  alert("Gagal simpan promo");
}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow space-y-4 max-w-xl"
    >
      <h2 className="text-xl font-bold">Form Penawaran Promo</h2>

      {/* Cluster */}
      <div>
        <label className="block mb-1 font-medium">Target Cluster</label>
        <select
          name="cluster"
          value={form.cluster}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
          required
        >
          <option value="">Pilih Cluster</option>
          <option value="1">Cluster 1 (Low Value)</option>
          <option value="2">Cluster 2 (Medium Value)</option>
          <option value="3">Cluster 3 (High Value)</option>
        </select>
      </div>

      {/* Type */}
      <div>
        <label className="block mb-1 font-medium">Jenis Promo</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg"
        >
          <option value="discount">Diskon</option>
          <option value="cross">Cross Selling</option>
        </select>
      </div>

      {/* Produk utama */}
      <div>
        <label className="block mb-1 font-medium">Produk Utama</label>
        <input
          type="text"
          name="product_id"
		  value={form.product_id}
          onChange={handleChange}
          placeholder="Contoh: Pagar Premium"
          className="w-full border p-2 rounded-lg"
          required
        />
      </div>

      {/* Diskon */}
      {form.type === "discount" && (
        <div>
          <label className="block mb-1 font-medium">Diskon (%)</label>
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>
      )}

      {/* Cross Sell */}
      {form.type === "cross" && (
        <div>
          <label className="block mb-1 font-medium">
            Produk Cross Selling
          </label>
          <input
            type="text"
            name="cross_product_id"
            value={form.cross_product_id}
            onChange={handleChange}
            placeholder="Contoh: Kanopi"
            className="w-full border p-2 rounded-lg"
          />
        </div>
      )}
	  
	  
	  <div>
	  <label className="block mb-1 font-medium">
	  Start Date
	  </label>
	  <input
  type="date"
  name="start_date"
  value={form.start_date}
  onChange={handleChange}
/>
	  </div>
	<label className="block mb-1 font-medium">
	End Date
	</label>
	  <input
  type="date"
  name="end_date"
  value={form.end_date}
  onChange={handleChange}
/>
	  
	<div>

	
	
	</div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700"
      >
        Simpan Promo
      </button>
    </form>
  );
}
