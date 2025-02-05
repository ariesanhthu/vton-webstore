'use client'
import React, {useState} from 'react'
import { notFound, useParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
import { ProductImageGallery } from '@/components/ProductImageGallery'
import { SizeSelector } from '@/components/SizeSelector'
import { ColorSelector } from '@/components/ColorSelector'
import mockClothingItems from '@/lib/seedData'

import axios from "axios";

// type Params = Promise<{ id: string }>
export default function ProductPage() {
  // In a real app, fetch product data based on params.id
  const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setImageUrl(null);

      const response = await axios.get("/api/virtual-try-on");

      if (response.data.success && Array.isArray(response.data.data)) {
        const url = response.data.data[0]?.url;
        if (url) {
          setImageUrl(url);
          console.log("Fetched URL:", url);
        } else {
          throw new Error("Invalid API response format");
        }
      } else {
        throw new Error("API response error");
      }
    } catch (err) {
      setError("Error fetching virtual try-on result" + err);
    } finally {
      setLoading(false);
    }
  };


  const { id } = useParams();

  const mockProduct = mockClothingItems.find((item) => item.id === id);
  if (!mockProduct) {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <ProductImageGallery images={mockProduct.images} />

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{mockProduct.name}</h1>
            <p className="text-muted-foreground">{mockProduct.brand}</p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-2xl font-bold">${mockProduct.price}</span>
            {mockProduct.originalPrice > mockProduct.price && (
              <span className="text-lg text-muted-foreground line-through">
                ${mockProduct.originalPrice}
              </span>
            )}
          </div>

          <div className="space-y-4">
            <ColorSelector
              colors={mockProduct.colors}
              selectedColor={mockProduct.colors[0].value}
              onSelectColor={() => {}}
            />

            <SizeSelector
              sizes={mockProduct.sizes}
              selectedSize={null}
              onSelectSize={() => {}}
            />
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1">Add to Cart</Button>
            <Button size="lg" variant="outline">Save to Wishlist</Button>
          </div>

          <div className="pt-6">
            <Tabs defaultValue="details">
              <TabsList className="w-full">
                <TabsTrigger value="tryon" className="flex-1">Try on</TabsTrigger>
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="care" className="flex-1">Care Instructions</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
              </TabsList>

          {/* VIRTUAL TRY ON */}
              <TabsContent value="tryon" className="space-y-4">            
                  <button
                    onClick={fetchData}
                    disabled={loading}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                  >
                    {loading ? "Processing..." : "Try Virtual Try-On"}
                  </button>
            
                  {error && <p className="text-red-500 mt-4">{error}</p>}
            
                  {imageUrl && (
                    <div className="mt-6">
                      <img
                        src={imageUrl}
                        alt="Virtual Try-On Result"
                        className="w-auto max-h-[500px] rounded-lg shadow-lg"
                      />
                    </div>
                  )}
              </TabsContent>
        {/* DETAIL */}
              <TabsContent value="details" className="space-y-4">
                <p className="text-sm">{mockProduct.description}</p>
                <div>
                  <h3 className="font-medium mb-2">Features</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {mockProduct.features.map((feature) => (
                      <li key={feature} className="text-sm">{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Fabric Composition</h3>
                  <p className="text-sm">{mockProduct.fabric}</p>
                </div>
              </TabsContent>
              <TabsContent value="care" className="space-y-4">
                <ul className="list-disc list-inside space-y-1">
                  {mockProduct.care.map((instruction) => (
                    <li key={instruction} className="text-sm">{instruction}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold">{mockProduct.rating}/5</div>
                  <div className="text-sm text-muted-foreground">
                    Based on {mockProduct.reviewCount} reviews
                  </div>
                </div>
                {/* Add review list component here */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
