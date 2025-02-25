import Queue from "@/models/Queue";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try{
        await connectDB();
        const { month } = await req.json();

        if(!month){
            return NextResponse.json({ error: "Month is required"}, {status: 400})
        }

        // ✅ ตรวจสอบว่าเดือนนี้มีอยู่แล้วหรือไม่
        const existingQueue = await Queue.findOne({month});
        if(existingQueue){
            return NextResponse.json({ message:"This month already exists"}, {status: 400})
        }

        // ✅ ถ้ายังไม่มี ให้สร้างเดือนใหม่แบบเปล่าๆ
        const newQueue = new Queue({
            month,
            isOpen: true,
            order: [],
        })

        await newQueue.save()
        
        return NextResponse.json({ message: "Queue month created", queue: newQueue }, { status: 200 });
    }catch(error){
        return NextResponse.json({ error: "Failed to create queue", detail: error.message}, {status: 500})
    }
}