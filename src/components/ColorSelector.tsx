import React from 'react'

interface ColorSelectorProps {
  colors: {
    name: string
    value: string
    available: boolean
  }[]
  selectedColor: string | null
  onSelectColor: (color: string) => void
}

export function ColorSelector({ colors, selectedColor, onSelectColor }: ColorSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Available Colors</h3>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onSelectColor(color.value)}
            disabled={!color.available}
            className={`h-8 w-8 rounded-full border-2 ${
              selectedColor === color.value ? 'border-primary' : 'border-transparent'
            } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            <span className="sr-only">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}