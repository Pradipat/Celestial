import mongoose from "mongoose";

const CommissionSchema = new mongoose.Schema(
    {
        category: { type: String, required: true },
        imageURL: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: "commissions"
    }
);

export default mongoose.models.Commission || mongoose.model("Commission", CommissionSchema);    