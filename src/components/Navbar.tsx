import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, PlusCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-emerald-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-bold text-2xl tracking-tight">TalabaMarket</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Kitob, laptop yoki boshqa narsa izlash..."
                className="w-full bg-white text-gray-900 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user?.role === 'seller' && (
              <Link to="/sell" className="hidden md:flex items-center gap-1 hover:text-emerald-200 transition-colors font-medium mr-2">
                <PlusCircle className="w-5 h-5" />
                Sotish
              </Link>
            )}

            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 bg-emerald-700 px-3 py-1.5 rounded-full border border-emerald-500">
                  <User className="w-4 h-4 text-emerald-200" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="text-sm text-emerald-200 hover:text-white transition-colors"
                >
                  Chiqish
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-white hover:text-emerald-200 transition-colors">
                  Kirish
                </Link>
                <Link to="/register" className="text-sm font-medium bg-white text-emerald-600 px-4 py-2 rounded-full hover:bg-emerald-50 transition-colors shadow-sm">
                  Ro'yxatdan o'tish
                </Link>
              </div>
            )}

            <Link to="/cart" className="relative p-2 hover:bg-emerald-700 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2 hover:bg-emerald-700 rounded-full transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
