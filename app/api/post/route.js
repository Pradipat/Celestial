import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Portfolio from "@/models/Portfolio";
import cloudinary from "@/utils/cloudinary";

export async function GET() {
    try {
      await connectDB();
      const portfolios = await Portfolio.find().sort({ createdAt: -1 });
  
      return NextResponse.json({ portfolios }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error fetching portfolios", details: error.message }, { status: 500 });
    }
  }

export async function POST(req) {
  try {
    await connectDB();

    const { category, image } = await req.json();

    if (!category || !image) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "portfolio_images",
        resource_type: "image",
      });

    const newPortfolio = new Portfolio({ category, imageURL: uploadRes.secure_url });
    await newPortfolio.save();

    return NextResponse.json({ message: "Portfolio created successfully", portfolio: newPortfolio }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error adding product", details: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
    try {
      await connectDB();
      const { id, newImage } = await req.json();
  
      if (!id || !newImage) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
      }

      const portfolio = await Portfolio.findById(id);
      if(!portfolio){
        return NextResponse.json({ error: "Portfolio not found"}, {status: 400})
      }

      // ✅ ลบรูปจาก Cloudinary
      if (portfolio.imageURL){
        const oldImagePublicId = portfolio.imageURL.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`portfolio_images/${oldImagePublicId}`);
        console.log("✅ Deleted old image:", oldImagePublicId);
      }
  
      // ✅ อัปโหลดรูปใหม่ไป Cloudinary
      const uploadRes = await cloudinary.uploader.upload(newImage, {
        folder: "portfolio_images",
        resource_type: "image",
      });

      console.log("✅ New image uploaded:", uploadRes.secure_url);
  
      // ✅ อัปเดตฐานข้อมูล
      const updatedPortfolio = await Portfolio.findByIdAndUpdate(
        id,
        { imageURL: uploadRes.secure_url },
        { new: true }
      );
  
      return NextResponse.json({ message: "Image updated", imageURL: updatedPortfolio.imageURL }, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ error: "Error updating image", details: error.message }, { status: 500 });
    }
  }

export async function DELETE(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        console.log("🛠️ Deleting portfolio with ID:", id);

        if (!id) {
            return NextResponse.json({ error: "Invalid request, ID is required" }, { status: 400 });
        }

        const portfolio = await Portfolio.findById(id);
        if (!portfolio) {
            return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
        }

        console.log("✅ Portfolio found:", portfolio);

        // ✅ ลบรูปจาก Cloudinary
        const imagePublicId = portfolio.imageURL.split("/").pop().split(".")[0]; // ดึง `public_id`
        await cloudinary.uploader.destroy(`portfolio_images/${imagePublicId}`);

        // ✅ ลบ portfolio ออกจาก MongoDB
        await Portfolio.findByIdAndDelete(id);

        return NextResponse.json({ message: "Portfolio deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error deleting portfolio:", error.message);
        return NextResponse.json({ error: "Error deleting image", details: error.message }, { status: 500 });
    }
}