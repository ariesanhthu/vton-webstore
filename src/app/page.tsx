// import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ClothingGrid } from '@/components/ClothingGrid'
import mockClothingItems from "@/lib/seedData";
import { SignInButton, SignUpButton } from '@clerk/nextjs'

import SearchForm from "@/components/SearchForm";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full text-center">
        {/* PRODUCT SECTION */}
        <div className="container">
          <div className="flex flex-col gap-6 justify-center justify-items-center">
              <h1 className="heading">Clothing Store</h1>
              <p className="text-muted-foreground text-lg font-bold pt-5">Browse our collection of clothing items</p>

              <div className="flex justify-center">
                <SearchForm query={query} />
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