import Queue from "@/models/Queue";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try{
        await connectDB();
        const { month } = await req.json();

        if(!month){
            return NextResponse.json({error:"Month is required"}, {status: 400})
        }

        // ✅ ค้นหาและลบเดือนที่ต้องการ
        const deletedQueue = await Queue.findOneAndDelete({month : month});

        if(!deletedQueue){
            return NextResponse.json({error:"Queue month not found"}, {status: 400})
        }

        return NextResponse.json({error:`Queue for ${month} deleted successfully`}, {status: 200})
    }catch (error){
        return NextResponse.json({ error:"Failed to delete queue", detail:error.message}, {status: 500})
    }
}