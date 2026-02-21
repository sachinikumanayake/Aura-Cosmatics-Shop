'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, 
  ShoppingBag, 
  Settings, 
  Camera, 
  Trash2, 
  X, 
  Sparkles, 
  Heart, 
  Clock, 
  Star,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const BACKEND_URL = "http://localhost:3001";

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      router.push('/login');
    } else {
      const data = JSON.parse(savedUser);
      setUser(data);
      setNewName(data.name);
    }
  }, [router]);

  const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=E9D5FF&color=7E22CE`;
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return cleanPath.includes('uploads') ? `${BACKEND_URL}${cleanPath}` : `${BACKEND_URL}/uploads${cleanPath}`;
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BACKEND_URL}/user/upload-image/${user.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
      });
      const updatedUser = { ...user, image: response.data.user.image }; 
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${BACKEND_URL}/user/${user.id}`, 
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedUser = { ...user, name: response.data.name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsSettingsOpen(false);
    } catch (error) {
      alert("Update failed!");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  const flowers = [
    { top: '5%', left: '80%', size: 300, rotate: 0, opacity: 0.4, delay: 0 },
    { top: '60%', left: '-5%', size: 400, rotate: 45, opacity: 0.2, delay: 2 },
    { top: '15%', left: '5%', size: 150, rotate: -20, opacity: 0.3, delay: 1 },
    { top: '80%', left: '75%', size: 250, rotate: 160, opacity: 0.25, delay: 3 },
    { top: '40%', left: '85%', size: 120, rotate: 90, opacity: 0.15, delay: 1.5 },
    { top: '50%', left: '45%', size: 80, rotate: 10, opacity: 0.1, delay: 4 }, 
  ];

  return (
    <div className="min-h-screen bg-[#FDFBFF] relative overflow-hidden font-sans pb-20">
      
      {/* --- Background Floral Elements --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {flowers.map((flower, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: flower.opacity, 
              scale: 1,
              y: [0, 15, 0] 
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              delay: flower.delay,
              ease: "easeInOut" 
            }}
            className="absolute hidden md:block"
            style={{ 
              top: flower.top, 
              left: flower.left, 
              width: flower.size, 
              height: flower.size,
              transform: `rotate(${flower.rotate}deg)`
            }}
          >
            <Image 
              src="/images/flower-5r.png" 
              alt="Background Flower" 
              fill 
              className="object-contain" 
            />
          </motion.div>
        ))}

        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-pink-100/40 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto pt-28 px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-purple-500 font-bold tracking-widest uppercase text-xs mb-2 block">Aura Sanctuary</span>
            <h1 className="text-6xl font-serif font-medium text-[#2D1B4E]">
              Welcome, <span className="italic text-purple-600">{user.name}</span>
            </h1>
          </motion.div>
          
          <div className="flex gap-4">
             <button onClick={() => setIsSettingsOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border border-purple-100 rounded-full shadow-sm hover:shadow-md transition-all text-purple-600 font-medium">
               <Settings size={18}/> Settings
             </button>
             <button onClick={handleLogout} className="p-3 bg-red-50 text-red-400 rounded-full hover:bg-red-100 transition-all">
               <LogOut size={20}/>
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Profile Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 backdrop-blur-2xl p-8 rounded-[40px] shadow-sm border border-white flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-40 h-40 rounded-full p-1.5 bg-gradient-to-tr from-purple-200 to-pink-200">
                  <img 
                    src={getImageUrl(user.image)} 
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-sm"
                    alt="Profile"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.name}`; }}
                  />
                </div>
                <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-2 bg-purple-600 text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Camera size={18}/>
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              </div>
              
              <h2 className="text-2xl font-bold text-[#2D1B4E]">{user.name}</h2>
              <p className="text-purple-400 text-sm mb-6">{user.email}</p>
              
              <div className="w-full grid grid-cols-2 gap-4 border-t border-purple-50 pt-6">
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Wishlist</p>
                  <p className="text-lg font-bold text-purple-700">12</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Points</p>
                  <p className="text-lg font-bold text-purple-700">450</p>
                </div>
              </div>
            </motion.div>

            {/* Loyalty Card */}
            <div className="bg-[#2D1B4E] p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform"><Sparkles size={80}/></div>
               <h3 className="text-xl font-bold mb-2">Aura Member</h3>
               <p className="text-purple-200 text-xs mb-6">Enjoy free shipping on all floral collections.</p>
               <button className="w-full py-3 bg-purple-500 text-white rounded-2xl font-bold text-sm hover:bg-purple-400 transition-colors">
                 View Benefits
               </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Clock size={20}/>, label: "Orders", val: "04 Total" },
                { icon: <Heart size={20}/>, label: "Likes", val: "24 Items" },
                { icon: <Star size={20}/>, label: "Tier", val: "Silver" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/40 p-6 rounded-3xl border border-white/50 flex items-center gap-4">
                  <div className="p-3 bg-purple-50 text-purple-500 rounded-2xl">{item.icon}</div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{item.label}</p>
                    <p className="text-lg font-bold text-[#2D1B4E]">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shop Highlight */}
            <div className="bg-white/50 backdrop-blur-md p-10 rounded-[50px] border border-white shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-serif font-bold text-[#2D1B4E]">Recommended for You</h3>
                <button onClick={() => router.push('/shop')} className="text-purple-600 font-bold text-sm flex items-center gap-1">
                  Explore Shop <ChevronRight size={16}/>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-64 bg-purple-50/50 rounded-[40px] flex flex-col items-center justify-center border border-purple-100">
                   <ShoppingBag className="text-purple-200 mb-2" size={40}/>
                   <p className="text-purple-400 font-medium">No items yet</p>
                </div>
                <div className="h-64 bg-gradient-to-br from-pink-50/80 to-purple-50/80 rounded-[40px] p-8 flex flex-col justify-end border border-white">
                   <p className="text-[#2D1B4E] font-bold text-lg leading-tight">New Seasonal Fragrances</p>
                   <p className="text-sm text-gray-400 mt-2 mb-4">Discover the essence of Aura.</p>
                   <button className="text-xs font-black uppercase tracking-widest text-purple-600 self-start">Discover Now</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSettingsOpen(false)} className="fixed inset-0 bg-purple-900/20 backdrop-blur-md z-[100]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] p-12 flex flex-col shadow-2xl">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-[#2D1B4E]">Sanctuary Settings</h2>
                <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X/></button>
              </div>
              <div className="space-y-8 flex-1">
                <div className="space-y-2">
                  <label className="text-xs font-black text-purple-400 uppercase tracking-widest ml-2">Display Name</label>
                  <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full bg-purple-50 border-none rounded-2xl p-4 outline-none text-[#2D1B4E] focus:ring-2 ring-purple-200 transition-all" />
                </div>
                <button onClick={updateProfile} disabled={isLoading} className="w-full bg-[#2D1B4E] text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-purple-200 transition-all">
                  {isLoading ? "Saving..." : "Update Profile"}
                </button>

                <div className="pt-10 border-t border-gray-50 mt-auto">
                   <button className="w-full flex justify-between items-center p-4 text-red-400 font-bold hover:bg-red-50 rounded-2xl transition-colors">
                      Delete Account <Trash2 size={18}/>
                   </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}