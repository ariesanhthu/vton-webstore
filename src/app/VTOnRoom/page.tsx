"use client"
import { useState } from "react";
import { SingleImageDropzone } from '@/components/SingleImageDropzone'
import { useEdgeStore } from "@/lib/edgestore";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import defaultLoader from "@/utils/defaultLoader";
const clothingItems = [
  { id: 1, name: "T-Shirt", image: "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "Jacket", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, name: "Jeans", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 4, name: "Dress", image: "https://images.unsplash.com/flagged/photo-1585052201332-b8c0ce30972f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 5, name: "Hoodie", image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

export default function VirtualTryOn() {
  const [file1, setFile1] = useState<File>();
  const [file2, setFile2] = useState<File>();
  const [urls, setUrls] = useState({ file1: "", file2: "" });
  const [selectedClothing, setSelectedClothing] = useState(0);
  
  const { edgestore } = useEdgeStore();

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen p-6 space-y-6">
    <div className="flex gap-4 justify-center">
      <SingleImageDropzone
        width={200}
        height={200}
        value={file1}
        dropzoneOptions={{ maxSize: 1024 * 1024 * 3 }}
        onChange={async (file) => {
          setFile1(file);
          if (file) {
            try {
              const res = await edgestore.publicFiles.upload({
                file,
                options: { temporary: true },
              });
              setUrls((prev) => ({ ...prev, file1: res.url }));
            } catch (error) {
              console.error("Error uploading file:", error);
            }
          }
        }}
        className="border-dashed border-2 rounded-lg bg-muted/50"
      />
      <SingleImageDropzone
        width={200}
        height={200}
        value={file2}
        dropzoneOptions={{ maxSize: 1024 * 1024 * 3 }}
        onChange={async (file) => {
          setFile2(file);
          if (file) {
            try {
              const res = await edgestore.publicFiles.upload({
                file,
                options: { temporary: true },
              });
              setUrls((prev) => ({ ...prev, file2: res.url }));
            } catch (error) {
              console.error("Error uploading file:", error);
            }
          }
        }}
        className="border-dashed border-2 rounded-lg bg-muted/50"
      />
    </div>
    <div className="flex justify-center">
      <Button>TRY ON</Button>
    </div>

      <div className="flex flex-row justify-center gap-4 w-screen m-10 px-20">
        {clothingItems.map((item) => (
          <Card
            key={item.id}
            className={`h-full w-full cursor-pointer transition-all hover:shadow-lg border-2 overflow-hidden group ${
              selectedClothing === item.id ? "border-blue-500 bg-slate-900 text-white glow-card hover:shadow-glow-hover" : "border-gray-300"
            }`}
            onClick={() => setSelectedClothing(item.id)}
          >
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loader={defaultLoader}
                />
            </div>              
            <CardContent className="flex flex-wrap gap 2">
              <p className="mt-2 text-sm font-bold">{item.name}</p>
                
            </CardContent>
            
          </Card>
        ))}
      </div>
    </div>
  );
}
