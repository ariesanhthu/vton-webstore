'use client'
// import Image from "next/image";
import { ClothingGrid } from '@/components/ClothingGrid'
import mockClothingItems from "@/lib/seedData";
import { useState, useEffect } from 'react';
import SearchForm from "@/components/SearchForm";
import ChatBox from '@/components/ChatBox';
import axios from 'axios';
import { ProductProps } from '@/lib/ExternalType';

// Định nghĩa URL cơ sở của API
const API_BASE_URL = 'https://backend-vitonweb.onrender.com';

// Tạo instance axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://backend-vitonweb.onrender.com/api/v4/products');
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();

        console.log(data);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Failed to fetch products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading products: {error}</div>;
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full text-center">
        {/* PRODUCT SECTION */}
        <div className="container">
          <div className="flex flex-col gap-6 justify-center justify-items-center">
              <h1 className="heading">Clothing Store</h1>
              <p className="text-muted-foreground text-lg font-bold pt-5">Chat với AI giúp bạn phối đồ</p>

              <div className="flex justify-center">
                <ChatBox/>
              </div>
              <div className="flex justify-center">
                {/* <SearchForm query={query} /> */}
              </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                {/* Filter components will be added here */}
              </div>
              <div className="flex gap-2">
                {/* Sort options will be added here */}
              </div>
            </div>

            <ClothingGrid items={products} />
            <ClothingGrid items={products} />
        
          </div>
        </div>
        {/* END SECTION */}
      </div>
    </main>
  )
}