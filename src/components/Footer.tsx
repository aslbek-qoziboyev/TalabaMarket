import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">TalabaMarket</h3>
            <p className="text-sm text-gray-400">
              Talabalar uchun eng arzon online bozor. O'zingizga kerakli hamma narsani toping yoki soting.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Kategoriyalar</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/Kitoblar" className="hover:text-emerald-400 transition-colors">Kitoblar va Konspektlar</Link></li>
              <li><Link to="/category/Texnika" className="hover:text-emerald-400 transition-colors">Texnika va Elektronika</Link></li>
              <li><Link to="/category/O'quv jihozlari" className="hover:text-emerald-400 transition-colors">O'quv jihozlari</Link></li>
              <li><Link to="/category/Talaba uchun buyumlar" className="hover:text-emerald-400 transition-colors">Talaba uchun buyumlar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Ma'lumotlar</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-emerald-400 transition-colors">Biz haqimizda</Link></li>
              <li><Link to="#" className="hover:text-emerald-400 transition-colors">Qanday sotish mumkin?</Link></li>
              <li><Link to="#" className="hover:text-emerald-400 transition-colors">Talaba ID chegirmalari</Link></li>
              <li><Link to="#" className="hover:text-emerald-400 transition-colors">Bog'lanish</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Ijtimoiy tarmoqlar</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} TalabaMarket. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}
