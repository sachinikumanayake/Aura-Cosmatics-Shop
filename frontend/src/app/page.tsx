'use client';
import { motion, Variants } from 'framer-motion'; 
import Image from 'next/image';
import Link from 'next/link';
export default function HomePage() {
  
  const allProducts = [
    { id: 1, name: "Aura Essence", price: "$45.00", img: "47.jpg" },
    { id: 2, name: "Radiant Glow", price: "$55.00", img: "product-2.png" },
    { id: 3, name: "Midnight Serum", price: "$60.00", img: "product-8.png" },
    { id: 4, name: "Velvet Cream", price: "$40.00", img: "38.jpg" },
    { id: 5, name: "Floral Mist", price: "$35.00", img: "product9.png" },
    { id: 6, name: "Rose Dew", price: "$48.00", img: "50.jpg" },
    { id: 7, name: "Hydra Bloom", price: "$52.00", img: "38.jpg" },
    { id: 8, name: "Pure Radiance", price: "$50.00", img: "product-1.png" },
    { id: 9, name: "Velvet Cream", price: "$40.00", img: "46.jpg" },
    { id: 10, name: "Floral Mist", price: "$35.00", img: "40.jpg" },
    { id: 11, name: "Rose Dew", price: "$48.00", img: "48.jpg" },
    { id: 12, name: "Hydra Bloom", price: "$52.00", img: "35.jpg" },
    { id: 13, name: "Pure Radiance", price: "$50.00", img: "43.jpg" },
    { id: 14, name: "Aura Essence", price: "$45.00", img: "product0.png" },
    { id: 15, name: "Radiant Glow", price: "$55.00", img: "42.jpg" },
    { id: 16, name: "Midnight Serum", price: "$60.00", img: "41.jpg" },
    { id: 17, name: "Velvet Cream", price: "$40.00", img: "33.jpg" },
    { id: 18, name: "Floral Mist", price: "$35.00", img: "44.jpg" },
    { id: 19, name: "Rose Dew", price: "$48.00", img: "product11.png" },
    { id: 20, name: "Hydra Bloom", price: "$52.00", img: "product12.png" },
    { id: 21, name: "Pure Radiance", price: "$50.00", img: "product14.png" },
    { id: 22, name: "Velvet Cream", price: "$40.00", img: "product20.png" },
    { id: 23, name: "Floral Mist", price: "$35.00", img: "product30.jpg" },
    { id: 24, name: "Rose Dew", price: "$48.00", img: "45.jpg" },
    { id: 25, name: "Hydra Bloom", price: "$52.00", img: "32.jpg" },
    { id: 26, name: "Pure Radiance", price: "$50.00", img: "31.jpg" },
    { id: 27, name: "Hydra Bloom", price: "$52.00", img: "product29.jpg" },
    { id: 28, name: "Pure Radiance", price: "$50.00", img: "product28.jpg" },
  ];

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }, 
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };
  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-200 via-purple-400 to-purple-200 font-sans selection:bg-purple-100 selection:text-purple-600"> 
      
      <section className="relative min-h-screen flex bg-gradient-to-tr from-purple-400 via-purple-200 to-purple-400 items-center justify-center overflow-hidden bg-white pt-20">
        
         
        <div className="absolute top-10 left-0 w-64 h-64 opacity-80 animate-pulse-slow z-10">

          <Image src="/images/flower-5r.png" alt="Pink Flower" fill className="object-contain rotate-12" />
        </div>
        
        <div className="absolute bottom-0 right-0 w-80 h-80 opacity-80 animate-pulse-slow delay-300 z-10">

          <Image src="/images/flower-5r.png" alt="Pink Flower" fill className="object-contain -rotate-12" />
        </div>
        <div className="absolute bottom-4/5 right-0 w-80 h-30 opacity-40 animate-bounce-slow hidden md:block z-10">
          <Image src="/images/flower-5r.png" alt="Pink Flower Small" fill className="object-contain" />

        </div>
        <div className="absolute bottom-2/5 left-0  w-80 h-30 opacity-40 animate-bounce-slow hidden md:block z-10">
          <Image src="/images/flower-5r.png" alt="Pink Flower Small" fill className="object-contain" />
        </div>
        <div className="absolute bottom-10 top-2/4 right-4 w-32 h-32 opacity-40 animate-bounce-slow hidden md:block z-10">
          <Image src="/images/flower-5r.png" alt="Pink Flower Small" fill className="object-contain" />
        </div>

        <div className="absolute top-1/4 right-10 w-32 h-32 opacity-40 animate-bounce-slow hidden md:block z-10">
          <Image src="/images/flower-5r.png" alt="Pink Flower Small" fill className="object-contain" />
        </div>

        <div className="relative  bg-[#dbd1cf] z-30 flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl w-full mx-auto px-10 py-16  rounded-[3rem] shadow-2xl backdrop-blur-xl border border-white/50">
          <img src="/images/product-3.png" alt="frontimage"  className="shadow-2xl shadow-[#854ea9] animate-float" />
         
<div className="text-center md:text-left md:w-1/2">
  <span className="text-[#D64D64] font-bold tracking-[0.4em] uppercase text-xs mb-10 block animate-fade-in">
    Premium Skincare Essentials
  </span>
  <h2 className="text-5xl md:text-6xl font-serif text-[#4B2185] leading-tight mb-10 drop-shadow-sm">
    Embrace Your <br /> 
    <span className="italic text-purple-400 font-light">Natural Radiance</span>
  </h2>
  <p className="text-lg text-gray-600 mb-10 font-light leading-relaxed max-w-md">
    Discover a curated world of luxury beauty, designed to nourish your skin and reveal the effortless glow you were born with.
  </p>
  <Link href="/products" className="bg-[#db83d7] text-white px-3 py-4 mb-10 rounded-full text-sm tracking-widest uppercase font-semibold hover:bg-[#5B21B6] transition-all duration-300 shadow-xl transform hover:-translate-y-1 inline-block">
    Explore the Collection
  </Link>
</div>
        </div>
      </section>
      <section className="py-28 px-6 md:px-10 bg-gradient-to-b from-[#f3e8ff] to-white"> 
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-serif text-gray-800 mb-4">The Essentials</h2>
          <div className="w-16 h-1 bg-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto"
        >
          {allProducts.map((product) => (
            <motion.div 
              key={product.id} 
              variants={itemVariants}
              className="group cursor-pointer"
            >
              
              <div className="relative h-[300px] w-70 mb-6 overflow-hidden rounded-[2.5rem] bg-gradient-to-tr from-purple-200 via-purple-400 to-purple-200 font-sans selection:bg-purple-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-200">
                <Image 
                  src={`/images/${product.img}`} 
                  alt={product.name} 
                  fill 
                  className="object-contain p-8 transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              
              <h3 className="text-2xl font-serif text-gray-800 mb-1 px-2 italic">
                {product.name}
              </h3>
              <p className="text-purple-500 font-medium px-2">
                {product.price}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-16 px-6 border-t border-gray-50 text-center">
        <div className="text-3xl font-serif text-purple-700 mb-6 tracking-widest uppercase">AURA</div>
        <p className="text-gray-400 text-sm italic">&copy; {new Date().getFullYear()} Aura Cosmetics. Crafted for elegance.</p>
      </footer>
    </div>
  );
}