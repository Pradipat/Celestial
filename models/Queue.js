import mongoose from "mongoose";

const QueueSchema = new mongoose.Schema({
  month: { type: String, required: true }, // เช่น "February 2024"
  isOpen: { type: Boolean, default: false }, // ✅ เปิดรับงานเดือนนี้หรือไม่
  orders: [
    {
      name: { type: String, required: true }, // ✅ ชื่อลูกค้า
      details: { type: String, required: true }, // ✅ รายละเอียดของออเดอร์
      status: {
        type: String,
        enum: ["Idea Submission", "Quote and Agreement", "Half Payment", "Sketch Phase",
               "Coloring Phase", "Final Review", "Final Payment", "Delivered", "-"
        ],
        default: "Idea Submission", // ✅ สถานะเริ่มต้นเป็น Pending
      },
      createdAt: { type: Date, default: Date.now }, // ✅ วันที่สร้างคิว
    },
  ],
});

export default mongoose.models.Queue || mongoose.model("Queue", QueueSchema);
