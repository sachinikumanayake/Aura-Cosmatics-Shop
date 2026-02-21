'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
  category?: { name: string };
}

interface Category {
  id: number;
  name: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get('http://localhost:3001/product'),
          axios.get('http://localhost:3001/category')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `${product.name} has been added.`,
      timer: 1500,
      showConfirmButton: false
    });
  };

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category?.name === filter);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Aura Collection...</div>;

  return (
    <div className="min-h-screen bg-[#f8f0ff] pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-purple-950 mb-4">The Collection</h1>
          <p className="text-purple-800/60 text-lg italic">Nourish your skin with our premium essentials.</p>
        </motion.div>

        {/* Dynamic Categories From Admin */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button onClick={() => setFilter('All')} className={`px-8 py-2 rounded-full border transition-all ${filter === 'All' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'}`}>
            All
          </button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setFilter(cat.name)} className={`px-8 py-2 rounded-full border transition-all ${filter === cat.name ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border-purple-200'}`}>
              {cat.name}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={product.id} className="bg-white/60 backdrop-blur-md rounded-[40px] p-8 border border-white shadow-xl group">
              <div className="relative h-64 w-full mb-6 overflow-hidden rounded-3xl bg-purple-50">
                <img 
                  src={`http://localhost:3001${product.image}`} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-6 transition-transform group-hover:scale-110" 
                />
              </div>
              <div className="text-center">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{product.category?.name}</span>
                <h3 className="text-2xl font-serif text-purple-950 mt-1">{product.name}</h3>
                <p className="text-purple-600 font-bold text-xl mt-2">Rs. {product.price.toLocaleString()}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="mt-6 w-full py-4 bg-purple-950 text-white rounded-2xl font-bold transition-all hover:bg-purple-900"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}