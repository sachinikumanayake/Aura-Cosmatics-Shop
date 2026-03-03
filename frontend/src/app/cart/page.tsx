'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, User, MapPin, Phone, Trash2 } from 'lucide-react';

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(savedCart);
  }, []);

  const updateQty = (id: number, delta: number) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const removeItem = (id: number) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = items.length > 0 ? 350 : 0;
  const totalAmount = subtotal + delivery;

  // --- Backend Submission Logic ---
  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const orderData = {
      address: formData.get('address'),
      phone: formData.get('phone'),
      items: items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        alert("Please login to place an order! 🌸");
        window.location.href = '/login';
        return;
      }

      const response = await fetch('http://localhost:3001/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        alert("Order placed successfully! 🌸");
        localStorage.removeItem('cart');
        window.location.href = '/my-orders';
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Flower Animations
  const flowerElements = mounted ? Array.from({ length: 20 }).map((_, i) => {
    const randomLeft = Math.floor(Math.random() * 100);
    const randomTop = Math.floor(Math.random() * 100);
    const randomDuration = 10 + Math.random() * 20;
    const randomScale = 0.5 + Math.random() * 0.8;

    return (
      <motion.img
        key={i}
        src="/images/flower-3.png"
        className="absolute pointer-events-none opacity-[0.15]"
        style={{ left: `${randomLeft}%`, top: `${randomTop}%`, width: '100px' }}
        animate={{ rotate: 360, y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: randomDuration, repeat: Infinity, ease: "linear" }}
      />
    );
  }) : null;

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-purple-200 via-purple-400 to-purple-20 overflow-hidden pt-32 pb-20 px-4 md:px-10 font-sans">
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {flowerElements}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800">Your Aura Cart</h1>
          <div className="h-1 w-20 bg-[#D64D64] mx-auto mt-4 rounded-full opacity-50"></div>
        </motion.div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                  key={item.id} className="bg-white/70 backdrop-blur-md p-5 rounded-[2rem] shadow-sm flex items-center border border-pink-100/50"
                >
                  <img src={`http://localhost:3001${item.image}`} alt={item.name} className="w-24 h-24 rounded-2xl object-cover bg-slate-50 border border-pink-50" />
                  <div className="ml-6 flex-1">
                    <h3 className="font-semibold text-lg text-gray-800 font-serif">{item.name}</h3>
                    <p className="text-[#D64D64] font-bold mt-1 tracking-wide">Rs. {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center bg-white rounded-full px-4 py-2 mr-6 border border-pink-100 shadow-inner">
                    <button onClick={() => updateQty(item.id, -1)} className="px-2 text-xl text-[#D64D64] font-bold">-</button>
                    <span className="px-4 font-bold text-gray-700 min-w-[40px] text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="px-2 text-xl text-[#D64D64] font-bold">+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-3 hover:bg-red-50 rounded-full">
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-purple-300 backdrop-blur-xl p-8 rounded-[3rem] shadow-xl border border-white h-fit sticky top-32">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 font-serif">Order Summary</h2>
              <div className="space-y-5 text-gray-600">
                <div className="flex justify-between items-center"><span className="font-medium">Subtotal</span><span className="font-semibold text-gray-800 text-lg">Rs. {subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between items-center"><span className="font-medium">Delivery Fee</span><span className="font-semibold text-gray-800">Rs. {delivery.toLocaleString()}</span></div>
                <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent my-4"></div>
                <div className="flex justify-between items-center text-2xl font-bold text-gray-800"><span>Total</span><span className="text-[#D64D64]">Rs. {totalAmount.toLocaleString()}</span></div>
              </div>
              <button onClick={() => setIsCheckoutOpen(true)} className="w-full bg-[#D64D64] text-white py-5 rounded-[2rem] font-bold mt-10 shadow-lg hover:bg-[#b83d52] transition-all transform hover:-translate-y-1">
                Proceed to Checkout
              </button>
            </motion.div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-white/40 backdrop-blur-md rounded-[4rem] border border-dashed border-pink-200">
            <h2 className="text-2xl font-serif text-gray-500 italic">Your cart is as light as a petal...</h2>
            <Link href="/shop" className="inline-block mt-8 bg-[#D64D64] text-white px-12 py-4 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity">Start Shopping</Link>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCheckoutOpen(false)} className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.95 }} className="relative bg-white w-full max-w-xl rounded-[3.5rem] shadow-2xl overflow-hidden">
              <div className="bg-[#D64D64] p-10 text-white relative">
                <div className="relative z-10">
                  <h2 className="text-3xl font-serif font-bold mb-2">Checkout</h2>
                  <p className="text-pink-100 font-light">Enter your shipping details to complete the order.</p>
                </div>
                <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-8 right-8 bg-white/10 p-3 rounded-full hover:bg-white/20"><X size={20} /></button>
              </div>

              {/* --- Checkout Form --- */}
              <form onSubmit={handleCheckout} className="p-10 space-y-6 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 ml-1 uppercase tracking-widest">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D64D64]" size={20} />
                      <input name="name" type="text" required placeholder="Aura Customer" className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-pink-100 outline-none text-gray-700" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 ml-1 uppercase tracking-widest">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#D64D64]" size={20} />
                      <input name="phone" type="tel" required placeholder="07X XXX XXXX" className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-pink-100 outline-none text-gray-700" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 ml-1 uppercase tracking-widest">Delivery Address</label>
                    <div className="relative group">
                      <MapPin className="absolute left-5 top-5 text-gray-300 group-focus-within:text-[#D64D64]" size={20} />
                      <textarea name="address" required rows={3} placeholder="Street, City, Province" className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-pink-100 outline-none text-gray-700 resize-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full bg-[#D64D64] text-white py-5 rounded-[2rem] font-bold shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : <><CreditCard size={20} /> Confirm Order - Rs. {totalAmount.toLocaleString()}</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}