'use client';
import { useEffect, useState } from 'react';
import { ShoppingBasket, Plus, Trash2, Pencil, X, ImageIcon, Loader2 } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminSidebar from '@/components/AdminSidebar'; 

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null); 
  
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    stock: '', 
    categoryId: '' 
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:3001/product');
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:3001/category');
    setCategories(res.data);
  };

  const handleEditClick = (product: any) => {
    setEditId(product.id);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description || '', 
      stock: product.stock.toString(),
      categoryId: product.categoryId.toString()
    });
    setIsPanelOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    const data = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (file) data.append('image', file);

    try {
      if (editId) {
        await axios.patch(`http://localhost:3001/product/${editId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
        });
        Swal.fire('Updated!', 'Product updated successfully', 'success');
      } else {
        await axios.post('http://localhost:3001/product', data, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
        });
        Swal.fire('Success', 'Product added successfully!', 'success');
      }
      
      closePanel();
      fetchProducts();
    } catch (err) {
      Swal.fire('Error', 'Action failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D64D64',
      cancelButtonColor: '#cbd5e1',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Deleted!', 'Product has been deleted.', 'success');
        fetchProducts();
      } catch (err) {
        Swal.fire('Error', 'Failed to delete product', 'error');
      }
    }
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setEditId(null);
    setFormData({ name: '', price: '', description: '', stock: '', categoryId: '' });
    setFile(null);
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfd]">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-slate-800 tracking-tight mt-20">Aura Store</h1>
          <button 
            onClick={() => setIsPanelOpen(true)} 
            className="bg-[#D64D64] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-pink-100 mt-30"
          >
            <Plus size={18}/> New Product
          </button>
        </header>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="p-6 text-left">Product</th>
                <th className="p-6 text-left">Category</th>
                <th className="p-6 text-left">Stock</th>
                <th className="p-6 text-right">Price</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p: any) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 flex items-center gap-4">
                    <img src={`http://localhost:3001${p.image}`} className="w-12 h-12 rounded-xl object-cover border" alt="" />
                    <span className="font-bold text-slate-700">{p.name}</span>
                  </td>
                  <td className="p-6 text-slate-500 text-sm">{p.category?.name}</td>
                  <td className="p-6 text-slate-500 text-sm">{p.stock}</td>
                  <td className="p-6 text-right font-bold text-[#D64D64]">LKR {p.price}</td>
                  <td className="p-6 text-right space-x-2">
                    <button onClick={() => handleEditClick(p)} className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                      <Pencil size={18}/>
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={18}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isPanelOpen && (
            <div className="fixed inset-0 z-50 flex justify-end">
                <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={closePanel} />
                <div className="relative w-full max-w-lg bg-white h-screen shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="p-8 border-b flex justify-between items-center bg-[#D64D64] text-white">
                        <h2 className="text-2xl font-serif font-bold italic">{editId ? 'Edit Product' : 'Add New Product'}</h2>
                        <button onClick={closePanel}><X size={24} /></button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto pb-20">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Product Name</label>
                            <input required type="text" className="w-full p-4 bg-slate-50 border-none rounded-2xl" 
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>

                        {/* DESCRIPTION FIELD ADDED HERE */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Description</label>
                            <textarea 
                              required 
                              rows={4}
                              className="w-full p-4 bg-slate-50 border-none rounded-2xl resize-none" 
                              placeholder="Describe your product beauty..."
                              value={formData.description} 
                              onChange={e => setFormData({...formData, description: e.target.value})} 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">Price (LKR)</label>
                                <input required type="number" className="w-full p-4 bg-slate-50 border-none rounded-2xl" 
                                value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">Stock</label>
                                <input required type="number" className="w-full p-4 bg-slate-50 border-none rounded-2xl" 
                                value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
                            <select required className="w-full p-4 bg-slate-50 border-none rounded-2xl"
                            value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})}>
                                <option value="">Select Category</option>
                                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Image {editId && "(Optional)"}</label>
                            <input type="file" className="w-full p-4 bg-slate-50 border-none rounded-2xl" 
                            onChange={e => setFile(e.target.files?.[0] || null)} />
                        </div>

                        <button disabled={loading} type="submit" className="w-full py-5 bg-[#D64D64] text-white rounded-[2rem] font-bold shadow-lg shadow-pink-100 flex justify-center">
                           {loading ? <Loader2 className="animate-spin" /> : (editId ? "Update Product" : "Publish Product")}
                        </button>
                    </form>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}