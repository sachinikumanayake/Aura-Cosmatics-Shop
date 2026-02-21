'use client';
import { LayoutDashboard, Users, ShoppingBasket, ClipboardList, Tag, LogOut } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20}/>, label: "Dashboard", href: "/admin" },
    { icon: <ShoppingBasket size={20}/>, label: "Products", href: "/admin/products" },
    { icon: <Tag size={20}/>, label: "Categories", href: "/admin/category" },
    { icon: <ClipboardList size={20}/>, label: "Orders", href: "/admin/orders" },
    { icon: <Users size={20}/>, label: "Customers", href: "/admin/user" },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-100 flex flex-col sticky top-0 h-screen">
      <div className="p-8">
        <h2 className="text-2xl font-serif font-bold text-[#D64D64] tracking-tighter italic">AURA ADMIN</h2>
      </div>
      <nav className="flex-1 px-6 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm cursor-pointer ${pathname === item.href ? 'bg-[#D64D64] text-white shadow-lg shadow-pink-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
              {item.icon} {item.label}
            </div>
          </Link>
        ))}
      </nav>
      <div className="p-6 border-t border-slate-50">
        <button onClick={handleLogout} className="flex items-center gap-3 text-slate-400 hover:text-red-500 transition-colors font-medium w-full p-3 font-bold">
          <LogOut size={20}/> Logout
        </button>
      </div>
    </aside>
  );
}