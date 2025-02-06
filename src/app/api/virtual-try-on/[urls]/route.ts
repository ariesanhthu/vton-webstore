import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Params = Promise<{ urls: string }>

export async function POST(req: Request) {
    try {
        // await connectDB();

        const { url } = await req.json();

        return NextResponse.json({ success: true, data: url });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error archiving order' }, { status: 500 });
    }
}