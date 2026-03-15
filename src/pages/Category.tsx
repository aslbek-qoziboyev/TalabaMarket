import { useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

export default function Category() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { products: filteredProducts, loading } = useProducts(categoryName);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{categoryName}</h1>
          <p className="text-gray-500 mt-2">{filteredProducts.length} ta mahsulot topildi</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Holati</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-sm text-gray-700">Yangi</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-sm text-gray-700">Ikkinchi qo'l</span>
                </label>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Universitet</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-sm text-gray-700">TATU</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-sm text-gray-700">TDTU</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-sm text-gray-700">O'zMU</span>
                </label>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-500">Bu kategoriyada mahsulot topilmadi.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
