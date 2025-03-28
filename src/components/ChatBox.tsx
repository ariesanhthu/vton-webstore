'use client'
import { useEffect, useRef, useState } from "react";
import mockClothingItems from "@/lib/seedData";
import { ClothingGrid } from "./ClothingGrid";

type Message = {
  role: "user" | "assistant";
  content: string;
};


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

// interface ClothingGridProps {
// items: ClothingItem[]
// }
function extractArray(input: string): number[] {
  // Tìm mảng số dạng [x, y, ...]
  const arrayMatch = input.match(/\[([\d\s,]+)\]/);
  
  if (!arrayMatch) return [];
  
  // Trích xuất nội dung trong mảng và chuyển đổi thành số
  return arrayMatch[1]
    .split(',')
    .map(item => Number(item.trim()))
    .filter(num => !isNaN(num));
}

export default function ChatBox() {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [arrayClothes, setArrayClothes] = useState<number[]>([]);
  const [products, setProducts] = useState<ClothingItem[]>([])


  {/* Thêm phần hiển thị trạng thái loading */}
  {isLoading && <div className="loading-indicator">Đang xử lý...</div>}
  // Cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {

    if (!input.trim()) return;
  
    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
  
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
  
      if (!response.ok) throw new Error(`Lỗi HTTP: ${response.status}`);
  
      const data = await response.json();
      
      // Thêm kiểm tra kiểu dữ liệu chặt chẽ hơn
      if (!data?.content || typeof data.content !== "string") {
        throw new Error("Dữ liệu trả về không hợp lệ");
      }
        console.log(data);
        
        const arrayImage = extractArray(data.content);
        const filteredItems = mockClothingItems.filter(item => 
          arrayImage.includes(Number(item.id)) // Chuyển id sang number nếu cần
        );

        setProducts(filteredItems)
        // setArrayClothes(extractArray(data.content));

        // console.log(arrayClothes); // Output: [5, 7.5, 10, 2, 4, 6]

        setMessages(prev => [...prev, data]);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      // Thêm xử lý hiển thị lỗi cho người dùng
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-lg h-[400px] overflow-y-auto w-screen">
      
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-2 my-2 rounded-md w-fit max-w-[80%] ${
            msg.role === "user"
              ? "bg-blue-500 text-white self-end ml-auto"
              : "bg-gray-300 text-black"
          }`}
        >
          {msg.content}
        </div>
      ))}
      <div ref={chatEndRef} />
      <div>
        <input
            name="chat"
            className="search-input"
            placeholder="Tìm đồ với AI"
            value={input}  // Thêm binding value
            onChange={(e) => setInput(e.target.value)}  // Thêm xử lý thay đổi
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Ngăn chặn xuống dòng
                sendMessage();
              }
            }}
          />
      </div>
      <div>            
        {products.length > 0 && <ClothingGrid items={products} />}
      </div>
    </div>
  );
}
