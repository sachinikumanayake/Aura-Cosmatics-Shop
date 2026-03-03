'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3001/order/my-orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-500 bg-yellow-50';
      case 'DELIVERED': return 'text-green-500 bg-green-50';
      default: return 'text-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 md:px-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-800">My Purchase History</h1>
          <p className="text-gray-500 mt-2">Track and manage your aura orders</p>
        </header>

        {loading ? (
          <div className="text-center py-20">Loading your orders...</div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={order.id} 
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center border-b border-gray-50 pb-4 mb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-2xl text-purple-600">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium uppercase tracking-tighter">Order ID</p>
                      <p className="font-bold text-gray-700">#AURA-{order.id}</p>
                    </div>
                  </div>
                  
                  <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img 
                          src={`http://localhost:3001${item.product.image}`} 
                          className="w-12 h-12 rounded-lg object-cover bg-gray-50" 
                          alt="" 
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{item.product.name}</p>
                          <p className="text-sm text-gray-400">Qty: {item.quantity} x Rs.{item.price}</p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-700">Rs. {(item.quantity * item.price).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 -mx-6 -mb-6 p-6 flex flex-wrap justify-between items-center">
                  <div className="text-sm text-gray-500">
                     Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-xl font-bold text-[#D64D64]">
                    Total: Rs. {order.total.toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed">
             <p className="text-gray-400">You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}