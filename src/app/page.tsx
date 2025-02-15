// import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ClothingGrid } from '@/components/ClothingGrid'
import mockClothingItems from "@/lib/seedData";
import { SignInButton, SignUpButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full text-center">
        {/* PRODUCT SECTION */}
        <div className="container py-10">
          <div className="flex flex-col gap-6">
              <h1 className="heading">Clothing Store</h1>
              <p className="text-muted-foreground">Browse our collection of clothing items</p>

            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                {/* Filter components will be added here */}
              </div>
              <div className="flex gap-2">
                {/* Sort options will be added here */}
              </div>
            </div>

            <ClothingGrid items={mockClothingItems} />
        
          </div>
        </div>
        {/* END SECTION */}
      </div>
    </main>
  )
}