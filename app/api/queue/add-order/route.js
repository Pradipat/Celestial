import Queue from "@/models/Queue";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try{
        await connectDB();
        const { month, order } = await req.json();

        if( !month){
            return NextResponse.json({ error:"Missing required parameters"}, {status: 400})
        }

        // ✅ ค้นหาเดือนที่ต้องการเพิ่มคิวเข้าไป
        const queue = await Queue.findOne({month});

        if(!queue){
            return NextResponse.json({ error:"Queue month not found"}, {status: 404})
        }

        // ✅ เพิ่มคิวของลูกค้าใหม่ลงไป
        const newOrder = {
            _id: new mongoose.Types.ObjectId(), // สร้าง ObjectId อัตโนมัติ
            name: order?.name || "-",
            details: order?.details || "-",
            status: order?.status || "Delivered",
        };

        queue.orders.push(newOrder);
        await queue.save()
        
        return NextResponse.json({message: "Order added successfully", queue}, {status: 200})

    } catch(error){
        return NextResponse.json({ error: "Failed to add order", detail: error.message}, {status: 500})
    }
}