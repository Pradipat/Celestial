import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "@/utils/db";
import Portfolio from "@/models/Portfolio";

export async function PUT(req) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try{
        await connectDB();
        const { oldCategory, newCategory } = await req.json();

        if(!oldCategory || !newCategory){
            return NextResponse.json({ error:"Invalid request"}, {status: 400})
        }

        // ✅ อัปเดต Category ที่มีชื่อเดียวกันทั้งหมดใน MongoDB
        await Portfolio.updateMany({ category: oldCategory, }, { category: newCategory })

        return NextResponse.json({ message: "Category updated successfully"}, {status: 200});

    } catch (error){
        return NextResponse.json({ error:"Error updating category", detail: error.message }, {status : 500})
    }
}