import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, CreditCard, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [studentId, setStudentId] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', maximumFractionDigits: 0 }).format(price);
  };

  const handleApplyDiscount = () => {
    if (studentId.length > 5) {
      setDiscountApplied(true);
    } else {
      alert('Iltimos, haqiqiy talaba ID raqamini kiriting.');
    }
  };

  const finalPrice = discountApplied ? totalPrice * 0.9 : totalPrice;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Savatcha bo'sh</h2>
          <p className="text-gray-500 mb-8">Hali hech narsa qo'shmadingiz. Mahsulotlarni ko'rish uchun bosh sahifaga o'ting.</p>
          <Link to="/" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-2 transition-colors shadow-lg shadow-emerald-200">
            Xarid qilish <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-8">Savatcha</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-center">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-32 h-32 object-cover rounded-xl bg-gray-50"
                  referrerPolicy="no-referrer"
                />
                
                <div className="flex-1 flex flex-col h-full justify-between w-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link to={`/product/${item.id}`} className="font-bold text-lg text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2">
                        {item.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{item.seller.university} talabasi</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                      aria-label="O'chirish"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-auto">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-white rounded-md text-gray-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className="text-xl font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Buyurtma xulosasi</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Jami mahsulotlar:</span>
                  <span className="font-medium text-gray-900">{items.reduce((acc, item) => acc + item.quantity, 0)} ta</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Mahsulotlar narxi:</span>
                  <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Talaba chegirmasi (10%):</span>
                    <span className="font-medium">-{formatPrice(totalPrice * 0.1)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Yetkazib berish:</span>
                  <span className="font-medium text-gray-900">Bepul</span>
                </div>
              </div>

              {/* Discount Code */}
              <div className="mb-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <label htmlFor="studentId" className="block text-sm font-semibold text-emerald-900 mb-2">
                  Talaba ID raqami
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Masalan: 312019..."
                    className="flex-1 px-4 py-2 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    disabled={discountApplied}
                  />
                  <button
                    onClick={handleApplyDiscount}
                    disabled={discountApplied || !studentId}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Qo'llash
                  </button>
                </div>
                {discountApplied && (
                  <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Chegirma qo'llanildi!
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-900">Jami to'lov:</span>
                  <span className="text-3xl font-extrabold text-emerald-600">{formatPrice(finalPrice)}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  alert('To\'lov sahifasiga o\'tilmoqda...');
                  clearCart();
                }}
                className="w-full bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-xl shadow-gray-200"
              >
                <CreditCard className="w-5 h-5" />
                To'lov qilish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for checkmark
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
