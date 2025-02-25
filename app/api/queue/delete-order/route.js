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

    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");
    const orderId = searchParams.get("orderId");
  
    if (!month || !orderId) {
      return NextResponse.json({ message: "Missing month or orderId" }, { status: 400 });
    }
  
    try {
      const updatedQueue = await Queue.findOneAndUpdate(
        { month },
        { $pull: { orders: { _id: orderId } } },
        { new: true }
      );
  
      if (!updatedQueue) {
        return NextResponse.json({ message: "Month not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Order deleted successfully", queue: updatedQueue });
    } catch (error) {
      console.error("Error deleting order:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
