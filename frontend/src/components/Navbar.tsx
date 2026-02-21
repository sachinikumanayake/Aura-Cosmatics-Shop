'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode'; 
import Image from 'next/image';

interface DecodedToken {
  role: string;
  exp: number;
}

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        } else {
          setUserRole(decoded.role);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Invalid token", error);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const dashboardPath = userRole === 'ADMIN' ? '/admin' : '/user';

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-pink-50 shadow-sm">
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="p-2 hover:bg-pink-100 rounded-full transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D64D64] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/" className="text-2xl font-serif font-black text-[#D64D64] tracking-[0.2em]">AURA</Link>
        </div>

        <div className="flex items-center space-x-8">
          {isLoggedIn ? (
            <Link href={dashboardPath} className="hidden sm:block text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#D64D64] transition-colors">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="hidden sm:block text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#D64D64] transition-colors">
              Login
            </Link>
          )}
          
          <Link href="/cart" className="relative group p-1">
            <img src="/images/cart.png" alt="cart" className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="absolute -top-1 -right-1 bg-[#D64D64] text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-sm">0</span>
          </Link>
        </div>
      </nav>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60] transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed top-0 left-0 h-full w-[320px] bg-gradient-to-tr from-purple-300 via-purple-300 to-purple-20 backdrop-blur-xl z-[70] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-hidden`}>
        
        <div className="absolute -top-12 -left-12 w-48 h-48 opacity-20 pointer-events-none rotate-45">
          <Image src="/images/flower-5r.png" alt="" width={200} height={200} className="object-contain" />
        </div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 opacity-20 pointer-events-none -rotate-12">
          <Image src="/images/flower-5r.png" alt="" width={250} height={250} className="object-contain" />
        </div>

        <div className="relative z-10 h-full flex flex-col p-8">
          <div className="flex justify-between items-center mb-16">
            <span className="text-xl font-serif font-black text-[#D64D64] tracking-widest">AURA</span>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="p-2 text-gray-400 hover:text-[#D64D64] hover:bg-pink-50 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col space-y-2">
            {[
              { name: 'Home', path: '/' },
              { name: 'Shop', path: '/shop' },
              { name: 'The Story of Aura', path: '/about' },
              { name: 'Contact Us', path: '/contact' },
            ].map((link) => (
              <Link 
                key={link.name}
                href={link.path} 
                onClick={() => setIsSidebarOpen(false)} 
                className="text-lg font-medium text-gray-700 hover:text-[#D64D64] py-3 border-b border-gray-50 flex items-center justify-between group transition-all"
              >
                <span>{link.name}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#D64D64] text-sm">→</span>
              </Link>
            ))}

            {isLoggedIn && (
              <Link 
                href={dashboardPath} 
                onClick={() => setIsSidebarOpen(false)} 
                className="text-lg font-medium text-gray-700 hover:text-[#D64D64] py-3 border-b border-gray-50 flex items-center justify-between group transition-all"
              >
                <span>Dashboard</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#D64D64] text-sm">→</span>
              </Link>
            )}
          </nav>

          <div className="mt-auto pt-10 border-t border-gray-100">
             <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">© 2026 Aura Cosmetics</p>
          </div>
        </div>
      </aside>
    </>
  );
}