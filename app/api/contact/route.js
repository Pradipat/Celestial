import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const {
      name,
      email,
      contactMethod,
      scale,
      size,
      background,
      numCharacters,
      deadline,
      intendedUse,
      description,
      agreement
    } = await req.json();

    if (!agreement === true) {
      return NextResponse.json({error: "Check agreement before submit"}, {status: 400});
    }

    // ✅ ตรวจสอบว่าข้อมูลครบถ้วน
    if (!name || !email || !contactMethod || !scale || !size || !background || !deadline || !intendedUse || !description) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // ✅ ตรวจสอบค่า numCharacters
    if (!numCharacters || isNaN(numCharacters) || numCharacters < 1) {
      return NextResponse.json({ error: "Number of characters must be at least 1" }, { status: 400 });
    }

    // ✅ ตั้งค่า SMTP Server ของ Gmail (ใช้ App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // ✅ อีเมลของ Admin
        pass: process.env.EMAIL_PASS, // ✅ ใช้ App Password (16 หลัก)
      },
    });

    // ✅ ส่งอีเมลไปยัง Admin แจ้งว่ามี Order ใหม่
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // 📩 ส่งไปที่ Admin
      replyTo: email, // ✅ เพิ่ม Reply-To ให้ Admin สามารถตอบกลับลูกค้าได้
      subject: "🎨 New Art Commission Order Received",
      html: `
        <h2>🎨 New Commission Order</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Preferred Contact:</strong> ${contactMethod}</p>
        <p><strong>Scale:</strong> ${scale}</p>
        <p><strong>Size:</strong> ${size}</p>
        <p><strong>Background:</strong> ${background}</p>
        <p><strong>Number of Characters:</strong> ${numCharacters}</p>
        <p><strong>Deadline:</strong> ${deadline}</p>
        <p><strong>Intended Use:</strong> ${intendedUse}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
        <br>
        <p>📩 Please review this order and respond accordingly.</p>
      `,
    });

    // ✅ ส่งอีเมลยืนยัน Order กลับไปยังลูกค้า
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email, // 📩 ส่งไปที่อีเมลของลูกค้า
      subject: "🎨 Your Art Commission Order is Confirmed!",
      html: `
        <h2>🎨 Thank you for your commission request, ${name}!</h2>
        <p>We have received your order and will process it soon.</p>
        <h3>🖌 Order Details:</h3>
        <p><strong>Scale:</strong> ${scale}</p>
        <p><strong>Size:</strong> ${size}</p>
        <p><strong>Background:</strong> ${background}</p>
        <p><strong>Number of Characters:</strong> ${numCharacters}</p>
        <p><strong>Deadline:</strong> ${deadline}</p>
        <p><strong>Intended Use:</strong> ${intendedUse}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
        <br>
        <p>🎨 If you have any questions, feel free to contact us.</p>
        <p>📩 Thank you for choosing our art service!</p>
      `,
    });

    return NextResponse.json({ message: "✅ Order confirmation email sent!" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
