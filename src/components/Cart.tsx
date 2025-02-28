"use client";

import React from "react";
import { useCart, CartItem } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return <p className="text-center text-gray-400">Giỏ hàng của bạn đang trống.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
      <ul className="space-y-4">
        {cart.map((item: CartItem) => (
          <li key={item.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded object-cover" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-300">{item.price} ₫</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                className="w-16 p-1 rounded bg-gray-700 text-white text-center border border-gray-600"
              />
              <Button onClick={() => removeFromCart(item.id)}>Xóa</Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-end">
        <Button onClick={clearCart}>Xóa toàn bộ</Button>
      </div>
    </div>
  );
}
