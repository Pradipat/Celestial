import Queue from "@/models/Queue";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try{
        await connectDB();
        const { month, isOpen } = await req.json();

        if( !month || typeof isOpen !== "boolean"){
            return NextResponse.json({error: "Month and isOpen status are required"}, {status: 400})
        }

         // ✅ ค้นหาและอัปเดต `isOpen` ของเดือนนั้น
        const queue = await Queue.findOneAndUpdate(
            { month :month},
            { $set: { isOpen: isOpen } },
            { new: true }
        )
        
        if (!queue) {
            return NextResponse.json({ error: "Queue month not found" }, { status: 404 });
        }

        return NextResponse.json({message: "Queue status updated", queue }, {status: 200})
        
    }catch(error) {
        return NextResponse.json({ error: "Failed to update queue status", detail: error.message}, {status : 500})
    }
}