import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // ✅ ดึง Token จาก Cookies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // ❌ ถ้าไม่มี Token → ไม่ได้ล็อกอิน
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ❌ ถ้าไม่ใช่ Admin → ปฏิเสธการเข้าถึง
  if (token.role !== "admin") {
    return NextResponse.json({ error: "Forbidden - Admins only" }, { status: 403 });
  }

  // ✅ ถ้าเป็น Admin ให้ทำงานต่อ
  return NextResponse.next();
}

// ✅ กำหนดให้ Middleware ใช้กับ `/api/post/*`
export const config = {
  matcher: ["/api/post", "/api/post/update-category"],
};
