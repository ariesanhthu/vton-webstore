import React from 'react'
import { Button } from '@/components/ui/button'

interface SizeSelectorProps {
  sizes: {
    value: string
    label: string
    available: boolean
  }[]
  selectedSize: string | null
  onSelectSize: (size: string) => void
}

export function SizeSelector({ sizes, selectedSize, onSelectSize }: SizeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Select Size</h3>
        <button className="text-sm text-primary hover:underline">Size Guide</button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {sizes.map((size) => (
          <Button
            key={size.value}
            variant={selectedSize === size.value ? "default" : "outline"}
            disabled={!size.available}
            onClick={() => onSelectSize(size.value)}
            className="w-full"
          >
            {size.label}
          </Button>
        ))}
      </div>
    </div>
  )
}