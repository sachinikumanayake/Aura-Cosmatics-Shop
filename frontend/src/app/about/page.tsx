'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#f3e8ff]" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c6abdd] via-[#e5b3d2] to-[#ffffff] relative overflow-hidden font-sans">
      
      <div className="absolute -top-10 -left-10 w-80 h-80 opacity-25 animate-float z-0">
        <Image src="/images/flower-5r.png" alt="Flower" width={400} height={400} className="object-contain rotate-45" />
      </div>

      {/* Bottom Right Large Flower */}
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] opacity-25 animate-float-delayed z-0">
        <Image src="/images/flower-5r.png" alt="Flower" width={500} height={500} className="object-contain -rotate-12" />
      </div>

      {/* Scattered Small Flowers */}
      <div className="absolute top-[15%] right-[10%] w-24 h-24 opacity-40 animate-bounce-slow z-0">
        <Image src="/images/flower-3.png" alt="Flower" width={100} height={100} className="object-contain" />
      </div>
      
      <div className="absolute bottom-[30%] left-[5%] w-32 h-32 opacity-30 animate-pulse z-0 hidden md:block">
        <Image src="/images/flower-3.png" alt="Flower" width={130} height={130} className="object-contain rotate-90" />
      </div>

      <div className="absolute top-[60%] right-[45%] w-20 h-20 opacity-20 animate-float z-0">
        <Image src="/images/flower-3.png" alt="Flower" width={80} height={80} className="object-contain -rotate-45" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Professional Imagery */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] md:h-[650px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white"
          >
            <Image 
              src="/images/shop.jpg" 
              alt="Aura Essence" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700" 
            />
            {/* Overlay Glass Box */}
            <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/30 backdrop-blur-lg rounded-3xl border border-white/40 text-purple-950">
              <p className="text-2xl font-serif italic font-semibold">"Radiance is a state of mind."</p>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-2 bg-purple-200/50 text-purple-800 rounded-full text-sm font-bold tracking-widest uppercase">
              Our Story
            </div>
            
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-purple-950 leading-tight">
              Believe in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-500">Natural Radiance</span>
            </h1>

            <p className="text-xl text-purple-900/80 leading-relaxed font-light italic">
              Welcome to **AURA**. We believe that beauty is not just about appearance; it's about the confidence that comes from healthy, glowing skin. Our mission is to provide premium skincare essentials designed to nourish your skin and reveal the effortless glow you were born with.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="p-6 bg-white/60 backdrop-blur-sm rounded-3xl border border-purple-200 space-y-2 shadow-sm">
                <h3 className="text-3xl font-bold text-purple-700">100%</h3>
                <p className="text-purple-600 font-medium uppercase text-xs tracking-widest">Natural Organic</p>
              </div>
              <div className="p-6 bg-white/60 backdrop-blur-sm rounded-3xl border border-purple-200 space-y-2 shadow-sm">
                <h3 className="text-3xl font-bold text-purple-700">24/7</h3>
                <p className="text-purple-600 font-medium uppercase text-xs tracking-widest">Customer Support</p>
              </div>
            </div>

      
          </motion.div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}