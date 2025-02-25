import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Queue from "@/models/Queue";

export async function GET() {

  try {
    await connectDB();

    // ✅ ดึงข้อมูล Queue ทั้งหมดจาก Database
    const allQueues = await Queue.find().sort({ month: 1 }); // เรียงตามเดือน

    return NextResponse.json({ queues: allQueues }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch queues", details: error.message }, { status: 500 });
  }
}
