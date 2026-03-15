import { Link } from 'react-router-dom';
import { BookOpen, Laptop, PenTool, Backpack, ArrowRight, Percent, PackageOpen } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import Hero3D from '../components/Hero3D';
import { motion } from 'framer-motion';

export default function Home() {
  const { products, loading } = useProducts();

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const cheapest = [...products].sort((a, b) => a.price - b.price).slice(0, 4);

  const categories = [
    { name: 'Kitoblar', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
    { name: 'Texnika', icon: Laptop, color: 'bg-purple-100 text-purple-600' },
    { name: 'O\'quv jihozlari', icon: PenTool, color: 'bg-orange-100 text-orange-600' },
    { name: 'Talaba uchun buyumlar', icon: Backpack, color: 'bg-emerald-100 text-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Talabalar uchun <br />
                <span className="text-emerald-200">eng arzon</span> bozor
              </h1>
              <p className="text-lg md:text-xl text-emerald-100 max-w-lg">
                Kitoblar, texnika, o'quv jihozlari va boshqalar. O'zingizga kerakli narsani arzon narxda toping yoki soting.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/category/Barchasi" className="bg-white text-emerald-600 px-6 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors shadow-lg">
                  Xarid qilish
                </Link>
                <Link to="/sell" className="bg-emerald-700 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-800 transition-colors border border-emerald-500">
                  Sotish
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block relative"
            >
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-3xl opacity-50"></div>
              <Hero3D />
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 z-10"
              >
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Percent className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Talaba ID bilan</p>
                  <p className="text-lg font-bold text-gray-900">10% Chegirma</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Kategoriyalar</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={`/category/${cat.name}`}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col items-center text-center gap-4 h-full"
              >
                <div className={`p-4 rounded-full ${cat.color} group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Eng ko'p sotilganlar</h2>
            <Link to="/category/Barchasi" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
              Barchasi <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : bestSellers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <PackageOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Hozircha mahsulotlar yo'q</p>
            </div>
          )}
        </div>
      </section>

      {/* Cheapest */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Eng arzon mahsulotlar</h2>
          <Link to="/category/Barchasi" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
            Barchasi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : cheapest.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cheapest.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <PackageOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Hozircha mahsulotlar yo'q</p>
          </div>
        )}
      </section>
    </div>
  );
}
