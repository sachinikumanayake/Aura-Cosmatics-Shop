'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Trash2, Plus, ImageIcon, Loader2, Pencil, X, 
  Users, ShoppingBasket, ClipboardList, Tag, TrendingUp 
} from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminSidebar from '@/components/AdminSidebar'; 

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false); 
  
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '', price: '', description: '', stock: '', categoryId: '' 
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchData(token);
    }
  }, []);

  const fetchData = async (token: string) => {
    try {
      const [p, c, u] = await Promise.all([
        axios.get('http://localhost:3001/product'),
        axios.get('http://localhost:3001/category'),
        axios.get('http://localhost:3001/user/all'), 
      ]);
      setProducts(p.data);
      setCategories(c.data);
      setUserCount(u.data.length);
    } catch (err) {
      console.error("Data fetch error");
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (file) data.append('image', file);

    try {
      await axios.post('http://localhost:3001/product', data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      Swal.fire('Success', 'Product added successfully!', 'success');
      setIsPanelOpen(false); 
      setFormData({ name: '', price: '', description: '', stock: '', categoryId: '' });
      setFile(null);
      fetchData(token!);
    } catch (err: any) {
      Swal.fire('Error', err.response?.data?.message || "Failed to add product", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex font-sans text-slate-900 relative overflow-hidden">
      
      {/* Background Flower Decoration */}
      <img src="/images/flower-3.png" className="absolute -top-20 -right-20 w-96 opacity-10 pointer-events-none" alt="" />
      <img src="/images/flower-3.png" className="absolute -bottom-20 -left-10 w-80 opacity-5 pointer-events-none rotate-180" alt="" />

      <AdminSidebar />

      <main className="flex-1 p-10 overflow-y-auto z-10">
        <header className="flex justify-between items-center mb-10">
        <div className="mt-20"> 
    <h1 className="text-3xl font-serif font-bold text-slate-800 tracking-tight">System Overview</h1>
    <p className="text-slate-400 text-sm font-medium italic">Welcome to Aura Management Console</p>
</div>
          
        </header>

        {/* ANALYTICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<ShoppingBasket className="text-pink-500" />} label="Products" value={products.length} />
          <StatCard icon={<Users className="text-blue-500" />} label="Customers" value={userCount} />
          <StatCard icon={<Tag className="text-orange-500" />} label="Categories" value={categories.length} />
          <StatCard icon={<ClipboardList className="text-green-500" />} label="Orders" value="12" />
        </div>

        {/* PRODUCTS TABLE */}
        <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h2 className="font-bold text-xl text-slate-700">Aura Product List</h2>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing all active products</span>
          </div>
          <table className="w-full">
            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="p-6 text-left">Product Details</th>
                <th className="p-6 text-left">Category</th>
                <th className="p-6 text-left">Stock Level</th>
                <th className="p-6 text-right">Unit Price</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p: any) => (
                <tr key={p.id} className="hover:bg-pink-50/30 transition-colors group">
                  <td className="p-6 flex items-center gap-4">
                    <img src={`http://localhost:3001${p.image}`} className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm" alt="" />
                    <div>
                        <p className="font-bold text-slate-700 block">{p.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">SKU: AURA-{p.id}</p>
                    </div>
                  </td>
                  <td className="p-6"><span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold">{p.category?.name}</span></td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${p.stock > 10 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <span className="text-slate-600 text-sm font-medium">{p.stock} units</span>
                    </div>
                  </td>
                  <td className="p-6 text-right font-black text-[#D64D64]">LKR {p.price}</td>
                  <td className="p-6 text-right space-x-1">
                    <button className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Pencil size={18}/></button>
                    <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* ADD PRODUCT SLIDE-OUT PANEL */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsPanelOpen(false)} />
          <div className="relative w-full max-w-lg bg-white h-screen shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
             <div className="p-8 border-b flex justify-between items-center bg-[#D64D64] text-white">
                <div>
                    <h2 className="text-2xl font-serif font-bold italic">New Product</h2>
                    <p className="text-pink-100 text-xs">Fill in the details to publish</p>
                </div>
                <button onClick={() => setIsPanelOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
             </div>
             
             <form onSubmit={handleCreateProduct} className="p-8 space-y-5 overflow-y-auto flex-1">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Product Name</label>
                    <input required type="text" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none transition-all" 
                    placeholder="e.g. Luxury Face Cream" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Price (LKR)</label>
                        <input required type="number" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none" 
                        placeholder="2500" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Stock</label>
                        <input required type="number" className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none" 
                        placeholder="50" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
                    <select required className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none appearance-none"
                    value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})}>
                        <option value="">Select Category</option>
                        {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Description</label>
                    <textarea rows={3} className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none" 
                    placeholder="Describe the product..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Product Image</label>
                    <div className="relative group cursor-pointer">
                        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 z-10 cursor-pointer" />
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 group-hover:bg-slate-100 transition-colors">
                            {file ? <p className="text-pink-500 font-bold">{file.name}</p> : <><ImageIcon className="text-slate-300 mb-2" size={32}/><p className="text-slate-400 text-sm">Click to upload image</p></>}
                        </div>
                    </div>
                </div>

                <button disabled={loading} type="submit" className="w-full py-5 bg-[#D64D64] text-white rounded-[2rem] font-bold shadow-lg shadow-pink-100 mt-4 hover:bg-[#b93d52] transition-all flex justify-center items-center">
                   {loading ? <Loader2 className="animate-spin" size={20}/> : "Publish Product"}
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
    return (
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl">{icon}</div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-black text-slate-800">{value}</p>
          </div>
        </div>
      </div>
    );
}