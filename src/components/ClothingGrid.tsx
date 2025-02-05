import React from 'react'
import { ClothingCard } from './ClothingCard'

interface ProductImage {
    url: string
    alt: string
}

interface ClothingItem {
  id: string
  name: string
  brand: string
  description: string
  price: number
  originalPrice: number

  imageUrl: string

  images: ProductImage[]
  sizes:{
    value: string
    label: string
    available: boolean
  }[]
  colors:{
    name: string
    value: string
    available: boolean
  }[]
  fabric: string
  care: string[]
  features: string[]
  stock: number
  rating: number
  reviewCount: number
  category: string
  tags: string[]
}

interface ClothingGridProps {
  items: ClothingItem[]
}

export function ClothingGrid({ items }: ClothingGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ClothingCard key={item.id} {...item} />
      ))}
    </div>
  )
}