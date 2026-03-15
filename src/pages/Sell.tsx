import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Upload, CheckCircle, ShieldAlert } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Sell() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || user.role !== 'seller') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
        >
          <div className="mx-auto h-20 w-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="h-10 w-10 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sotuvchi huquqi yo'q</h2>
          <p className="text-gray-600 mb-8">
            Platformada mahsulot sotish uchun sotuvchi sifatida ro'yxatdan o'tgan bo'lishingiz kerak.
          </p>
          {!user ? (
            <Link
              to="/register"
              className="inline-flex justify-center items-center w-full py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              Ro'yxatdan o'tish
            </Link>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="inline-flex justify-center items-center w-full py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              Bosh sahifaga qaytish
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!supabase) {
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 1000);
      return;
    }

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      
      const newProduct = {
        title: formData.get('title'),
        category: formData.get('category'),
        condition: formData.get('condition'),
        price: Number(formData.get('price')),
        description: formData.get('description'),
        image: 'https://picsum.photos/seed/new/400/400',
        seller_id: user.id,
      };

      const { error } = await supabase.from('products').insert([newProduct]);
      
      if (error) throw error;
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Xatolik yuz berdi. Iltimos qayta urinib ko\'ring.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">E'lon qo'shildi!</h2>
          <p className="text-gray-600 mb-8">
            Mahsulotingiz muvaffaqiyatli joylandi. Tez orada xaridorlar siz bilan bog'lanishadi.
          </p>
          <Link
            to="/"
            className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
          >
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Mahsulot sotish
              </h1>
              <p className="mt-4 text-lg text-gray-500">
                O'zingizga kerak bo'lmagan kitob, texnika yoki o'quv jihozlarini soting.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mahsulot rasmlari
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-2xl hover:border-emerald-500 transition-colors bg-gray-50 cursor-pointer">
                  <div className="space-y-1 text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
                      >
                        <span>Rasm yuklash</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="pl-1">yoki shu yerga tashlang</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (max 10MB)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Sarlavha
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      placeholder="Masalan: Oliy matematika 1-qism kitobi"
                      className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-xl px-4 py-3 bg-gray-50 border"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Kategoriya
                  </label>
                  <div className="mt-1">
                    <select
                      id="category"
                      name="category"
                      required
                      className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-xl px-4 py-3 bg-gray-50 border"
                    >
                      <option value="">Tanlang...</option>
                      <option value="Kitoblar">Kitoblar va Konspektlar</option>
                      <option value="Texnika">Texnika va Elektronika</option>
                      <option value="O'quv jihozlari">O'quv jihozlari</option>
                      <option value="Talaba uchun buyumlar">Talaba uchun buyumlar</option>
                    </select>
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                    Holati
                  </label>
                  <div className="mt-1">
                    <select
                      id="condition"
                      name="condition"
                      required
                      className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-xl px-4 py-3 bg-gray-50 border"
                    >
                      <option value="">Tanlang...</option>
                      <option value="Yangi">Yangi</option>
                      <option value="Ikkinchi qo'l">Ikkinchi qo'l (B/U)</option>
                    </select>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Narxi (UZS)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      required
                      placeholder="0"
                      className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-xl py-3 bg-gray-50 border"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">UZS</span>
                    </div>
                  </div>
                </div>

                {/* University */}
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                    Universitetingiz
                  </label>
                  <div className="mt-1">
                    <select
                      id="university"
                      name="university"
                      required
                      className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-xl px-4 py-3 bg-gray-50 border"
                    >
                      <option value="">Tanlang...</option>
                      <option value="TATU">TATU</option>
                      <option value="TDTU">TDTU</option>
                      <option value="O'zMU">O'zMU</option>
                      <option value="TDYU">TDYU</option>
                      <option value="Boshqa">Boshqa</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Batafsil ma'lumot
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      required
                      placeholder="Mahsulot holati, kamchiliklari yoki afzalliklari haqida yozing..."
                      className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 rounded-xl px-4 py-3 bg-gray-50 border"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Qancha to'liq ma'lumot bersangiz, shuncha tez sotiladi.
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-gray-200 flex justify-end gap-3">
                <Link
                  to="/"
                  className="bg-white py-3 px-6 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                >
                  Bekor qilish
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center items-center py-3 px-8 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors shadow-lg shadow-emerald-200 disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Upload className="w-5 h-5 mr-2" />
                  )}
                  E'lonni joylash
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
