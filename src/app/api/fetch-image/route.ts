import { NextResponse } from "next/server";
import axios from "axios";

import { client } from "@gradio/client";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }
        // tải ảnh background
        const imagePath = path.join(process.cwd(), "public", "tshirt.jpg");
        const clothBuffer = fs.readFileSync(imagePath);
        const clothImage = new Blob([clothBuffer], { type: "image/jpeg" });
        
        // Tải ảnh từ URL
        const response = await axios.get(url, { responseType: "arraybuffer" });
        const imageBuffer = Buffer.from(response.data);

        const exampleImage = new Blob([imageBuffer], { type: "image/jpeg" });

        // Chuyển thành Blob hoặc base64 để xử lý tiếp
        // const base64Image = `data:${response.headers["content-type"]};base64,${imageBuffer.toString("base64")}`;
// Kết nối API Gradio
        const app = await client("Nymbo/Virtual-Try-On");

        console.log("🔹 API Connected. Sending request...");

        // Gửi ảnh đến API Virtual Try-On
        const result = await app.predict("/tryon", [
            { background: exampleImage, layers: [], composite: exampleImage }, // 🔹 Sử dụng ảnh làm background
            clothImage, // Blob trong 'Garment' Image component
            "Hello!!", // String trong 'parameter_17' Textbox component
            true, // Boolean trong 'Yes' Checkbox component
            true, // Boolean trong 'Yes' Checkbox component
            20, // Giá trị hợp lệ cho 'Denoising Steps'
            20, // Giá trị hợp lệ cho 'Seed'
        ]);

        console.log("✅ API Response:", result.data);

        return NextResponse.json({ success: true, data: result.data});

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
    }
}
