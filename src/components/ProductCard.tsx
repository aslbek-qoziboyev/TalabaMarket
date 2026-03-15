import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { ShoppingCart, Star, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group flex flex-col h-full"
    >
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.condition === 'Ikkinchi qo\'l' && (
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
              B/U
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" /> Top
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <MapPin className="w-3 h-3" />
          <span>{product.seller?.university || 'Noma\'lum'}</span>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-emerald-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            {product.originalPrice && (
              <p className="text-xs text-gray-400 line-through mb-0.5">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Savatchaga qo'shish"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
