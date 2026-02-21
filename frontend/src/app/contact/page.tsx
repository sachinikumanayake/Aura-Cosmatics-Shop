'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ContactPage() {
  const flowerImages = [
    '/images/product-1.png',
    '/images/product-2.png',
    '/images/product-7.png',
    '/images/product-5.png'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flowerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [flowerImages.length]);

  if (!mounted) return <div className="min-h-screen bg-[#ca72d5]" />;

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-radial-[at_50%_50%] from-[#e265e8] via-[#ca72d5] to-[#e041cb] relative">
      
      {/* --- Background Decorative Flowers --- */}
      <div className="absolute top-0 -left-10 w-72 h-72 opacity-40 animate-float z-0">
        <Image src="/images/flower-5r.png" alt="Flower" width={300} height={300} className="object-contain rotate-45" />
      </div>
      <div className="absolute -bottom-10 -right-10 w-96 h-96 opacity-40 animate-float-delayed z-0">
        <Image src="/images/flower-5r.png" alt="Flower" width={400} height={400} className="object-contain -rotate-12" />
      </div>
      {/* Small floating flowers */}
      <div className="absolute top-[20%] right-[10%] w-24 h-24 opacity-30 animate-pulse-slow z-0">
        <Image src="/images/flower-3.png" alt="Flower" width={100} height={100} className="object-contain" />
      </div>
      <div className="absolute top-[80%] right-[90%] w-24 h-24 opacity-30 animate-pulse-slow z-0">
        <Image src="/images/flower-3.png" alt="Flower" width={100} height={100} className="object-contain" />
      </div>
      <div className="absolute buttom-[80%] right-[85%] w-24 h-24 opacity-30 animate-pulse-slow z-0">
        <Image src="/images/flower-3.png" alt="Flower" width={100} height={100} className="object-contain" />
      </div>
      <div className="relative z-10 w-full max-w-4xl px-6 py-20">
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-serif font-bold text-white mb-4 drop-shadow-md">
            Cantact <span className="text-white/80 italic">Us</span>
          </h1>
          <p className="text-white/90 text-lg font-light">We are here to assist your natural radiance journey.</p>
        </motion.div>

        {/* Combined Contact Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-[60px] border border-white/40 bg-white/20 backdrop-blur-xl shadow-2xl grid grid-cols-1 md:grid-cols-2 items-center"
        >
          {/* Left Side: Changing Images */}
          <div className="relative h-80 md:h-[450px] bg-white/10 flex items-center justify-center p-10 ">
             <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent " />
             <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                  className="w-full  h-full relative z-10"
                >
                  <Image 
                    src={flowerImages[currentIndex]} 
                    alt="Aura Product" 
                    fill 
                    className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] rounded-full" 
                  />
                </motion.div>
             </AnimatePresence>
          </div>

          {/* Right Side: Contact Details */}
          <div className="p-12 space-y-10">
            {/* Email Section */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left group">
              <h2 className="text-white/70 text-sm uppercase tracking-[0.2em] mb-2 font-bold">Write to us</h2>
              <h3 className="text-3xl font-bold text-white mb-1">Email Us</h3>
              <p className="text-white text-xl border-b border-white/30 pb-1 hover:border-white transition-all cursor-pointer">support@aura.com</p>
            </div>

            {/* Phone Section */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-white/70 text-sm uppercase tracking-[0.2em] mb-2 font-bold">Talk to us</h2>
              <h3 className="text-3xl font-bold text-white mb-1">Call Us</h3>
              <p className="text-white text-xl">+94 11 234 5678</p>
            </div>

            {/* Social or Extra Info */}
            <div className="pt-4 flex justify-center md:justify-start gap-4">
               <button className="px-8 py-4 bg-white text-[#ca72d5] rounded-full font-bold shadow-lg hover:scale-105 transition-transform active:scale-95">
                  Send Message
               </button>
            </div>
          </div>
        </motion.div>
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
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}