import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../data/products';

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      
      if (!supabase) {
        console.warn('Supabase is not connected.');
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        let query = supabase.from('products').select('*, seller:sellers(*)');
        
        if (category && category !== 'Barchasi') {
          query = query.eq('category', category);
        }
        
        const { data, error } = await query;
        if (error) throw error;
        
        const formattedData = data.map((item: any) => ({
          ...item,
          seller: Array.isArray(item.seller) ? item.seller[0] : item.seller
        }));
        
        setProducts(formattedData as Product[]);
      } catch (err) {
        console.error('Error fetching products from Supabase:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [category]);

  return { products, loading };
}

export function useProduct(id?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      
      setLoading(true);
      
      if (!supabase) {
        setProduct(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, seller:sellers(*)')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        const formattedData = {
          ...data,
          seller: Array.isArray(data.seller) ? data.seller[0] : data.seller
        };
        
        setProduct(formattedData as Product);
      } catch (err) {
        console.error('Error fetching product from Supabase:', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [id]);

  return { product, loading };
}
