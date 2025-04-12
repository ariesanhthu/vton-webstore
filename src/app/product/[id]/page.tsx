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
import { SingleImageDropzone } from '@/components/SingleImageDropzone'

import { useCart } from "@/context/CartContext";

import { useEdgeStore } from "@/lib/edgestore";

import Image from 'next/image'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Sparkles, AlertCircle } from "lucide-react"

import axios from "axios";
import { string } from 'zod'

import CartSidebar from '@/components/CartSidebar'
interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

// type Params = Promise<{ id: string }>
export default function ProductPage() {
  // In a real app, fetch product data based on params.id
  const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File>();
    // const [progress, setProgress] = useState(0);
    const [urls, setUrls] = useState<string>('');
    const { edgestore } = useEdgeStore();
    
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { id } = useParams();

  const mockProduct = mockClothingItems.find((item) => item.id === id);

  const tempProduct: ProductProps = {
    id: mockProduct?.id ?? '',
    name: mockProduct?.name ?? '',
    price: mockProduct?.price ?? 0,
    imageUrl: mockProduct?.imageUrl ?? ''
  };


  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setImageUrl(null);
      const Product = await mockClothingItems.find((item) => item.id === id);

      const response = await axios.post("/api/fetch-image", { url: urls, mockProductImage: Product?.imageUrl });
      console.log(response.data);
      if (response.data.success && Array.isArray(response.data.data)) {
        const url = response.data.data[0]?.url;
        if (url) {
          setImageUrl(url);
          setUrls(url);
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

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    console.log("Add to Cart clicked", tempProduct); // Debug log
    setSidebarOpen(true);
    if (tempProduct) {
      addToCart({
        id: tempProduct.id,
        name: tempProduct.name,
        price: tempProduct.price,
        quantity: 1,
        imageUrl: tempProduct.imageUrl
      });
    }
  };


  if (!mockProduct) {
    notFound()
  }

  return (
    <div className="container py-10">
      <CartSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

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
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>Add to Cart</Button>
            <Button size="lg" variant="outline">Save to Wishlist</Button>
          </div>

          <div className="pt-6">
            <Tabs defaultValue="tryon">
              <TabsList className="w-full">
                <TabsTrigger value="tryon" className="flex-1">Try on</TabsTrigger>
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="care" className="flex-1">Care Instructions</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
              </TabsList>

          {/* VIRTUAL TRY ON */}
          <TabsContent value="tryon" className="space-y-6 p-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Upload Section */}
              <Card className="p-6 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Upload Your Photo</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Upload a clear full-body photo for virtual try-on
                  </CardDescription>
                </CardHeader>
                
                <div className="space-y-4">
                  <SingleImageDropzone
                    width={200}
                    height={200}
                    value={file}
                    dropzoneOptions={{
                      maxSize: 1024 * 1024 * 3,
                    }}
                    onChange={async (file) => {
                      await setFile(file);
                      if(file) {
                        try {
                          const res = await edgestore.publicFiles.upload({
                            file,
                            options: { temporary: true }
                          });
                          await setUrls(res.url);
                        } catch (error) {
                          console.error('Error uploading file:', error);
                        }
                      }
                    }}
                    className="border-dashed border-2 rounded-lg bg-muted/50"
                  />
                  
                  {urls && (
                    <div className="relative aspect-square h-48 w-full overflow-hidden rounded-md border">
                    <Image 
                      src={urls}
                      alt="Upload preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  )}
                </div>
              </Card>

              {/* Try-On Section */}
              <Card className="p-6 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Virtual Try-On</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    See how it looks on you
                  </CardDescription>
                </CardHeader>
                
                <div className="space-y-4">
                  <Button 
                    onClick={fetchData}
                    disabled={loading}
                    className="w-full gap-2"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Try It On Now
                      </>
                    )}
                  </Button>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {imageUrl && (
                    <div className="relative aspect-square w-full overflow-hidden rounded-md border">
                      <img
                        src={imageUrl}
                        alt="Virtual Try-On Result"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </Card>
            </div>
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
