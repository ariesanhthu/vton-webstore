'use client'
import React, { useState } from 'react'
import Image from 'next/image'

interface ProductImageGalleryProps {
  images: {
    url: string
    alt: string
  }[]
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="grid gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={images[selectedImage].url}
          alt={images[selectedImage].alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 60vw, (max-width: 1200px) 40vw, 25vw"
        />

      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
              selectedImage === index ? 'border-primary' : 'border-transparent'
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 10vw"
            />
          </button>
        ))}
      </div>
    </div>
  )
}