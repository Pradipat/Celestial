import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { username, email, password } = await req.json();

    // ✅ เช็คว่าข้อมูลครบหรือไม่
    if (!username || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // ✅ เช็คว่าอีเมลนี้ถูกใช้ไปหรือยัง
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // ✅ เข้ารหัสรหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ สร้างบัญชีใหม่ (ตั้ง `role: "admin"` สำหรับ Admin)
    const newUser = new User({ username, email, password: hashedPassword, role: "admin" });
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: "Error registering user", details: error.message }, { status: 500 });
  }
}
