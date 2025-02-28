"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

interface CartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartSidebar({ open, onOpenChange }: CartSidebarProps) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-1/3 p-4 bg-gray-900 text-gray-100">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-white mb-10">Giỏ hàng của bạn</SheetTitle>
        </SheetHeader>
        {cart.length === 0 ? (
          <div className="text-center my-4">Giỏ hàng trống</div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm text-gray-400">{item.price} ₫</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                    }
                    className="px-2 py-1 bg-gray-700 rounded"
                  >
                    –
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    className="w-12 p-1 rounded bg-gray-800 text-center border border-gray-600"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-700 rounded"
                  >
                    +
                  </button>
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 px-2 py-1 rounded"
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-4">
              <Button onClick={clearCart} className="bg-red-600 hover:bg-red-700">
                Xóa toàn bộ
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
