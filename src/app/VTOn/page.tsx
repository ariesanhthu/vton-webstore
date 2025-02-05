"use client";

import { useState } from "react";
import axios from "axios";

export default function VirtualTryOnPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setImageUrl(null);

      const response = await axios.get("/api/virtual-try-on");

      if (response.data.success && Array.isArray(response.data.data)) {
        const url = response.data.data[0]?.url;
        if (url) {
          setImageUrl(url);
          console.log("Fetched URL:", url);
        } else {
          throw new Error("Invalid API response format");
        }
      } else {
        throw new Error("API response error");
      }
    } catch (err) {
      setError("Error fetching virtual try-on result" + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Virtual Try-On</h1>

      <button
        onClick={fetchData}
        disabled={loading}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        {loading ? "Processing..." : "Try Virtual Try-On"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {imageUrl && (
        <div className="mt-6">
          <img
            src={imageUrl}
            alt="Virtual Try-On Result"
            className="w-auto max-h-[500px] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
