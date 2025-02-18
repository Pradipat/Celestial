import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
    {
        category: { type: String, required: true },
        imageURL: { type: String, required: true },
    },
    { 
        timestamps: true,
        collection: "portfolios"
    }
);

export default mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
