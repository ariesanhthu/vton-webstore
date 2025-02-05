'use client'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ClothingCardProps {
  id: string
  name: string
  category: string
  imageUrl: string
  tags: string[]
  price: number
}

export function ClothingCard({ id, name, category, imageUrl, tags, price }: ClothingCardProps) {
  const router = useRouter()

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent Link click from triggering
    router.push(`/product/${id}`)
  }

  return (
    <Card className="overflow-hidden group">
      <Link href={`/product/${id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge variant="secondary">{category}</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-lg font-semibold">${price}</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}