import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";
import mockClothingItems from '@/lib/seedData'

const client = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Validate input
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" }, 
        { status: 400 }
      );
    }

    let contextPrompt = "Sử dụng tiếng Việt. Giúp người dùng tìm đồ phù hợp";
    
    if (messages.length > 0) {
      contextPrompt = `Dựa vào dữ liệu sau: ${JSON.stringify(mockClothingItems)}. 
      Chỉ trả về kết quả là 2 số ID của món đồ phù hợp với yêu cầu mô tả của người dùng 
      theo dạng mảng ví dụ: [1, 2]`;
    }

    console.log(contextPrompt);

    const chatCompletion = await client.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: contextPrompt 
        },
        ...messages,
      ],
      model: "deepseek-r1-distill-llama-70b",
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Validate API response
    if (!chatCompletion.choices?.[0]?.message) {
      throw new Error("Invalid response from Groq API");
    }

    return NextResponse.json(chatCompletion.choices[0].message);

  } catch (error) {
    console.error("API Error:", error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
        }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'An unknown error occurred' }, 
      { status: 500 }
    );
  }
}