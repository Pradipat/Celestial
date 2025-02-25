import Queue from "@/models/Queue";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try{
        await connectDB();
        const {month, orderId, name, details, status} = await req.json();

        if(!month || !orderId){
            return NextResponse.json({error: "Month and orderId are required"}, {status: 400});
        }
        
        // ✅ ค้นหา Queue ของเดือนนั้น
        const queue = await Queue.findOne({month});

        if (!queue) {
            return NextResponse.json({ error: "Queue not found for this month" }, { status: 404 });
        }

        // ✅ ค้นหา Order ตาม `orderId`
        const order = queue.orders.id(orderId);
        if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // ✅ อัปเดตข้อมูลของ Order
        if (name) order.name = name;
        if (details) order.details = details;
        if (status) order.status = status;

        // ✅ บันทึกการเปลี่ยนแปลง
        await queue.save();

        return NextResponse.json({ message: "Order updated successfully", queue }, { status: 200 });
    } catch(error){
        return NextResponse.json({ error: "Failed to update order", details: error.message }, { status: 500 });
    }

}