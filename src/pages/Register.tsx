import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, Role } from '../context/AuthContext';
import { Mail, User, ShieldCheck, KeyRound, Store, ShoppingBag, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role>('buyer');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { registerWithPassword, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Parollar mos kelmadi');
      return;
    }
    if (password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await registerWithPassword(email, password, {
        firstName,
        lastName,
        shopName: role === 'seller' ? shopName : undefined,
        role
      });
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await verifyOtp(email, otp);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Noto\'g\'ri kod');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
      >
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Ro'yxatdan o'tish</h2>
          <p className="mt-2 text-sm text-gray-500">
            {step === 1 ? 'Ma\'lumotlaringizni kiriting va rolni tanlang' : 'Emailingizga yuborilgan kodni kiriting'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form className="mt-8 space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rolingizni tanlang
              </label>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${role === 'buyer' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 hover:border-emerald-200'}`}>
                  <input type="radio" name="role" value="buyer" checked={role === 'buyer'} onChange={() => setRole('buyer')} className="sr-only" />
                  <ShoppingBag className={`w-6 h-6 ${role === 'buyer' ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <span className="text-sm font-medium">Sotib oluvchi</span>
                </label>
                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${role === 'seller' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 hover:border-emerald-200'}`}>
                  <input type="radio" name="role" value="seller" checked={role === 'seller'} onChange={() => setRole('seller')} className="sr-only" />
                  <Store className={`w-6 h-6 ${role === 'seller' ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <span className="text-sm font-medium">Sotuvchi</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Ism</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="firstName" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    className="pl-9 block w-full border border-gray-300 rounded-xl py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="Ali"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Familiya</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="lastName" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)}
                    className="pl-9 block w-full border border-gray-300 rounded-xl py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="Valiyev"
                  />
                </div>
              </div>
            </div>

            {role === 'seller' && (
              <div>
                <label htmlFor="shopName" className="block text-sm font-medium text-gray-700 mb-1">Do'kon nomi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="shopName" type="text" required value={shopName} onChange={(e) => setShopName(e.target.value)}
                    className="pl-9 block w-full border border-gray-300 rounded-xl py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="Mening do'konim"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email manzil</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 block w-full border border-gray-300 rounded-xl py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="talaba@mail.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Parol</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 block w-full border border-gray-300 rounded-xl py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="••••••"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Parolni tasdiqlash</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-9 block w-full border border-gray-300 rounded-xl py-2 px-3 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors mt-6 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Ro'yxatdan o'tish"
              )}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Akkauntingiz bormi? <Link to="/login" className="text-emerald-600 font-semibold hover:underline">Kirish</Link>
            </p>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Tasdiqlash kodi (OTP)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="pl-10 block w-full border border-gray-300 rounded-xl py-3 px-4 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors text-center tracking-widest text-lg"
                  placeholder="123456"
                  maxLength={6}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 text-center">
                {email} manziliga yuborilgan 6 xonali kodni kiriting. (Mock rejimida: 123456)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Tasdiqlash"
              )}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Orqaga qaytish
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
