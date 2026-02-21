'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:3001/user/register', formData);
      alert("Registration Successful! Please login.");
      router.push('/login');
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f0ff] p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-50px] left-[-50px] w-80 h-80 opacity-30"><Image src="/images/flower-5r.png" alt="Flower" width={400} height={400} className="object-contain" /></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-96 h-96 opacity-30"><Image src="/images/flower-5r.png" alt="Flower" width={500} height={500} className="object-contain" /></div>
      </div>

      <form onSubmit={handleRegister} className="relative z-10 bg-white/60 backdrop-blur-2xl p-10 rounded-[40px] shadow-2xl w-full max-w-md border border-white/50">
        <h2 className="text-3xl font-serif font-bold mb-6 text-purple-950 text-center">Join AURA</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Full Name" required className="w-full p-4 border border-purple-100 bg-white/50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-400 transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email" required className="w-full p-4 border border-purple-100 bg-white/50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-400 transition-all" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" required className="w-full p-4 border border-purple-100 bg-white/50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-400 transition-all" onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <button disabled={loading} className="w-full py-4 bg-purple-800 text-white rounded-2xl font-bold shadow-lg hover:bg-purple-900 transition-all">
            {loading ? "Registering..." : "Register Now"}
          </button>
        </div>
        <p className="mt-6 text-center text-gray-600">Already have an account? <Link href="/login" className="text-purple-700 font-bold hover:underline">Login here</Link></p>
      </form>
    </div>
  );
}