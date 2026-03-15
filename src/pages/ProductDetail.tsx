import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { ShoppingCart, Star, MapPin, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { product, loading } = useProduct(id);
  const { addToCart } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mahsulot topilmadi</h2>
          <Link to="/" className="text-emerald-600 hover:underline">Bosh sahifaga qaytish</Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Orqaga
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-12">
            {/* Image Section */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.condition === 'Ikkinchi qo\'l' && (
                <span className="absolute top-4 left-4 bg-amber-100 text-amber-800 text-sm font-bold px-3 py-1.5 rounded-lg">
                  B/U (Ikkinchi qo'l)
                </span>
              )}
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-center">
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <Link to={`/category/${product.category}`} className="hover:text-emerald-600 transition-colors">
                  {product.category}
                </Link>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {product.seller.rating}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                {product.title}
              </h1>

              <div className="mb-8">
                {product.originalPrice && (
                  <p className="text-lg text-gray-400 line-through mb-1">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
                <p className="text-4xl font-extrabold text-emerald-600">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="prose prose-sm text-gray-600 mb-8">
                <p>{product.description}</p>
              </div>

              {/* Seller Info */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Sotuvchi haqida</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xl">
                    {product.seller.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{product.seller.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {product.seller.university} talabasi
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Savatchaga qo'shish
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Xavfsiz to'lov</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <span>Universitetgacha yetkazish</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
