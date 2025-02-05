// import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ClothingGrid } from '@/components/ClothingGrid'
import mockClothingItems from "@/lib/seedData";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Clothing Inventory</h1>
        <p className="text-xl mb-8">Organize and manage your wardrobe efficiently</p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">Sign Up</Button>
          <Button variant="outline" size="lg">Log In</Button>
        </div>


        {/* PRODUCT SECTION */}
        <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Clothing Store</h1>
          <p className="text-muted-foreground">Browse our collection of clothing items</p>
        </div>

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