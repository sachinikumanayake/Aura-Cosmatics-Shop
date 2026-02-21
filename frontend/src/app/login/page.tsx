'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      
      const { access_token, user } = response.data;
  
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      if (user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Invalid Credentials!";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fff5f5]">
      <form onSubmit={handleLogin} className="bg-white/60 backdrop-blur-2xl p-10 rounded-[40px] shadow-2xl w-full max-w-md border border-white/80">
        <h2 className="text-4xl font-serif font-bold text-center text-red-900 mb-8">AURA Login</h2>
        <div className="space-y-6">
          <input type="email" placeholder="Email Address" required className="w-full p-4 border border-red-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-400 bg-white/80 transition-all" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="w-full p-4 border border-red-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-400 bg-white/80 transition-all" onChange={(e) => setPassword(e.target.value)} />
          <button disabled={loading} type="submit" className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold shadow-xl hover:bg-red-700 transition-all">
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
        <p className="mt-8 text-center text-gray-600">New here? <Link href="/register" className="text-red-600 font-bold hover:underline">Create Account</Link></p>
      </form>
    </div>
  );
}