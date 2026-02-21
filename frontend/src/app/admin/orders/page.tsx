'use client';
import AdminSidebar from '@/components/AdminSidebar';

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen bg-[#fcfcfd]">
      <AdminSidebar />
      <main className="flex-1 p-10 text-center">
        <h1 className="text-3xl font-serif font-bold mb-10 text-left">Orders Management</h1>
        <div className="p-20 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400">
           Order tracking system is under development.
        </div>
      </main>
    </div>
  );

}