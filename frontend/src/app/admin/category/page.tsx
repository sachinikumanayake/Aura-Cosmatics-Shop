'use client';
import { useEffect, useState } from 'react';
import { Tag, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import AdminSidebar from '@/components/AdminSidebar';
import Swal from 'sweetalert2';

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3001/category');
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleAdd = async () => {
    if (!newCat.trim()) return; 
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/category', 
        { name: newCat }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewCat('');
      fetchCategories();
      Swal.fire('Added!', 'Category has been added.', 'success');
    } catch (err) {
      Swal.fire('Error', 'Failed to add category', 'error');
    }
  };
  
  // DELETE FIX:
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
        await axios.delete(`http://localhost:3001/category/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Deleted!', 'Category has been deleted.', 'success');
        fetchCategories(); 
      } catch (err) {
        Swal.fire('Error', 'Failed to delete category', 'error');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfd]">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-serif font-bold mt-15 mb-2">Categories</h1>
        
        <div className="flex gap-4 mb-8">
          <input 
            value={newCat} 
            onChange={e => setNewCat(e.target.value)} 
            placeholder="Category Name" 
            className="p-4 rounded-2xl border flex-1 outline-none focus:ring-2 focus:ring-pink-200" 
          />
          <button 
            onClick={handleAdd} 
            className="bg-[#D64D64] text-white px-8 rounded-2xl font-bold hover:bg-[#b83d52] transition-colors"
          >
            Add
          </button>
        </div>

        <div className="bg-white rounded-3xl border overflow-hidden">
          {categories.length === 0 ? (
            <p className="p-10 text-center text-gray-400">No categories found.</p>
          ) : (
            categories.map((c: any) => (
              <div key={c.id} className="p-6 border-b last:border-b-0 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <span className="font-bold text-gray-700">{c.name}</span>
                <button 
                  onClick={() => handleDelete(c.id)} 
                  className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all"
                >
                  <Trash2 size={18}/>
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}