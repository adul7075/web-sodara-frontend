"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import {
  LayoutDashboard,
  Users,
  Package,
  LogOut,
  Menu, Home,
  X, Brain, ShoppingCart, 
  TruckElectric, TrendingUp,
} from "lucide-react";
import ApplicationLogo from "@/components/ApplicationLogo";

export default function Navigation({ user }) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const linkss = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Home size={20} />,
    },
	{
      name: "Cross Seeling",
      href: "/cross_sell",
      icon: <Brain size={20} />,
    },
	{
      name: "Barang",
      href: "/barang",
      icon: <Package size={20} />,
    },
	{
      name: "instertOrder",
      href: "/pesanan",
      icon: <LayoutDashboard size={20} />,
    },
	{
      name: "Customer",
      href: "/customer",
      icon: <Users size={20} />,
    },
  ];
  
  
  /**
   * ==========================
   * MENU BERDASARKAN ROLE
   * ==========================
   */
  const allMenus = {
    admin: [
      { name: "Dashboard KMeans", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
      { name: "CRM", href: "/cross_sell", icon: <TrendingUp size={20} /> },
      { name: "Barang", href: "/barang", icon: <Package size={20} /> },
      { name: "Insert Order", href: "/pesanan", icon: <ShoppingCart size={20} /> },
      { name: "Customer", href: "/customer", icon: <Users size={20} /> },
	  { name: "Rekap Transaksi", href: "/sumtransaksi", icon: <TruckElectric size={20} /> },
    ],

    user: [
      { name: "Barang", href: "/barang", icon: <Package size={20} /> },
      { name: "Insert Order", href: "/pesanan", icon: <ShoppingCart size={20} /> },
      { name: "Customer", href: "/customer", icon: <Users size={20} /> },
    ],

    pembeli: [
	{ name: "Pembelian", href: "/buyproduct", icon: <ShoppingCart  size={20} /> },
    ],
  };

  // default role jika user belum ke-load
  const role = user?.role_type || "user";
  const links = allMenus[role];

  return (
    <div className="flex">
  <aside
    className={`${
      open ? "w-64" : "w-20"
    } bg-white border-r border-gray-200 h-screen p-4 flex flex-col justify-between fixed transition-all duration-300`}
  >
    <div>
      {/* Header / Logo */}
<div className="flex items-center justify-between mb-8 h-14 px-1">

  {/* Logo - tampil hanya ketika open */}
  {open ? (
    <Link href="/welcome" className="flex items-center gap-3">
      <ApplicationLogo className="h-8 w-auto text-gray-700" />
      <span className="font-semibold text-gray-800 text-lg tracking-wide">
        ETMI SHOP
      </span>
    </Link>
  ) : (
    <div className="w-8" /> // Placeholder biar hamburger tetap rata
  )}

  {/* Hamburger Button */}
  <button
    onClick={() => setOpen(!open)}
    className="p-2 rounded-md hover:bg-gray-100 text-gray-600 flex items-center justify-center transition"
  >
    {open ? <X size={22} /> : <Menu size={22} />}
  </button>
</div>



      {/* Navigation */}
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all ${
              pathname === link.href ? "bg-gray-200 font-medium" : ""
            }`}
          >
            {link.icon}
            {open && <span>{link.name}</span>}
          </Link>
        ))}
      </nav>
    </div>

    {/* Bottom User Section */}
    <div className="border-t border-gray-200 pt-4 mt-6">
      <div className="flex items-center gap-3 px-2 mb-3">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>
        {open && (
          <div>
            <p className="font-medium text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
			<p className="text-sm text-gray-500">{user?.role_type} - {user?.id_pelanggan}</p>
          </div>
        )}
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-3 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition-all"
      >
        <LogOut size={20} />
        {open && <span>Logout</span>}
      </button>
    </div>
  </aside>

  {/* Main Content */}
  <main
    className={`flex-1 ml-${open ? "64" : "20"} transition-all duration-300 p-0`}
  >
    {/* PAGE CONTENT */}
  </main>
</div>

  );
}