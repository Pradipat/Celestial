import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Portfolio from "@/models/Portfolio";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching portfolio", details: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { category, imageURL } = await req.json();

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, { category, imageURL }, { new: true });

    if (!updatedPortfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Portfolio updated successfully", portfolio: updatedPortfolio }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating portfolio", details: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
    if (!deletedPortfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Portfolio deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting portfolio", details: error.message }, { status: 500 });
  }
}
