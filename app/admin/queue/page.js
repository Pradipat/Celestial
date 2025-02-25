"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "@/utils/hook/useDebounce";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

// 📌 ตัวเลือกสถานะ
const statusOptions = ["-", "Idea Submission", "Quote and Agreement", "Half Payment", "Sketch Phase",
                       "Coloring Phase", "Final Review", "Final Payment", "Delivered"];
const statusColors = {
   "Idea Submission": "bg-yellow-500",
   "Quote and Agreement": "bg-blue-500",
   "Half Payment": "bg-orange-500",
   "Sketch Phase": "bg-purple-500",
   "Coloring Phase": "bg-indigo-500",
   "Final Review": "bg-pink-500",
   "Final Payment": "bg-green-500",
   "Delivered": "bg-gray-500",
   "-": "bg-red-500",
};

export default function AdminQueuePage() {
  return (
    <ProtectedAdminQueuePage />
  );
}

function ProtectedAdminQueuePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ รอให้ `useSession()` โหลดก่อน
  if (status === "loading") return <h1>Loading...</h1>;

  // ✅ ป้องกันผู้ใช้ที่ไม่ได้เป็น Admin เข้าใช้
  if (!session || session.user.role !== "admin") {
    return <h1>⛔ Access Denied</h1>;
  }

  return <AdminQueuePageContent />;
}

function AdminQueuePageContent() {
  const [queue, setQueue] = useState({});
  const [loading, setLoading] = useState(true);
  const [editedQueue, setEditedQueue] = useState({}); // บันทึกข้อมูลที่แก้ไขก่อนส่ง API
  const [newOrders, setNewOrders] = useState({});
  const [newMonth, setNewMonth] = useState("");


  // ✅ ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const res = await axios.get("/api/queue/get-all");
        const groupedQueue = res.data.queues.reduce((acc, item) => {
          if (!acc[item.month]) acc[item.month] = [];
          acc[item.month] = [...acc[item.month], ...item.orders]; // รวม order เข้าไปในแต่ละเดือน
          return acc;
        }, {});

        setQueue(groupedQueue);

        // ✅ สร้าง newOrders โดยใช้โครงสร้างเดียวกับ groupedQueue
        const initialNewOrders = {};
        Object.keys(groupedQueue).forEach((month) => {
          initialNewOrders[month] = {
            name: "",
            details: "",
            status: "-", // ✅ ค่าเริ่มต้นของ Status
          };
        });

        setNewOrders(initialNewOrders); // ✅ เซ็ตค่าเริ่มต้นให้ newOrders
        
      } catch (error) {
        console.error("Error fetching queue:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQueue();
  }, []);

  // ✅ ฟังก์ชัน add month
  const handleAddMonth = async () => {
    if (!newMonth.trim()) return;
    
    try {
      const res = await axios.post("/api/queue/create-month", { month: newMonth });
  
      if (res.status === 200) {
        setQueue((prevQueue) => ({
          ...prevQueue,
          [newMonth]: [], // สร้างเดือนใหม่ที่ไม่มีคิว
        }));

        // ✅ เพิ่มค่าเริ่มต้นใน newOrders สำหรับเดือนใหม่
        setNewOrders((prevNewOrders) => ({
          ...prevNewOrders,
          [newMonth]: {
            name: "",
            details: "",
            status: "-", // ✅ สถานะเริ่มต้น
          }
        }));

        setNewMonth(""); // ล้างค่า input

      }
    } catch (error) {
      console.error("Error adding month:", error);
    }
  };

  // ✅ ฟังก์ชัน update queue
  const handleChange = (orderId, month, field, value) => {
    setQueue((prevQueue) => {
      const updatedQueue = { ...prevQueue };
      updatedQueue[month] = updatedQueue[month].map((item) =>
        item._id === orderId ? { ...item, [field]: value } : item
      );
      return updatedQueue;
    });

    setEditedQueue((prev) => ({
      ...prev,
      [`${month}-${orderId}`]: { ...prev[`${month}-${orderId}`], [field]: value },
    }));
  };

  // ✅ ใช้ Debounce เพื่อหน่วงเวลาส่ง API
  const debouncedQueue = useDebounce(editedQueue, 1000);

  // ✅ เมื่อ Debounce เสร็จแล้วค่อยส่ง API
  useEffect(() => {
    Object.keys(debouncedQueue).forEach(async (key) => {
      const [month, orderId] = key.split("-");
      const updatedData = debouncedQueue[key];

      try {
        await axios.put("/api/queue/update-order", {
          month,
          orderId,
          ...updatedData,
        });
      } catch (error) {
        console.error("Error updating order:", error);
      }
    });
  }, [debouncedQueue]);

  // ✅ เพิ่ม Queue รายบุคคล
  const handleAddOrder = async (month) => {
    if (!month) return;
  
    try {
      // ✅ ใช้ค่าเริ่มต้นหากไม่ได้กรอกข้อมูล
      const newOrderData = {
        name: newOrders[month]?.name || "-",
        details: newOrders[month]?.details || "-",
        status: newOrders[month]?.status || "-",
      };
  
      const res = await axios.post("/api/queue/add-order", {
        month,
        order: newOrderData,
      });

      const updatedOrders = res.data.queue.orders;
      const newOrder = updatedOrders[updatedOrders.length - 1];
  
      if (res.status === 200 && newOrder) {
        // ✅ อัปเดต UI โดยเพิ่มข้อมูลใหม่เข้าไปใน State
        setQueue((prevQueue) => ({
          ...prevQueue,
          [month]: [...(prevQueue[month] || []), newOrder], 
        }));
  
        // ✅ รีเซ็ตค่า input เป็นค่าว่างหลังจากเพิ่ม
        setNewOrders((prev) => ({
          ...prev,
          [month]: { name: "", details: "", status: "-" },
        }));
      }
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };
  

  // ✅ ลบ Queue รายบุคคล
  const handleDeleteOrder = async (month, orderId) => {
    // ยืนยันการลบก่อน
    if (!confirm("⚠️ คุณต้องการลบรายการนี้ใช่หรือไม่?")) return;
  
    try {
      // ส่ง DELETE Request โดยใช้ query parameters ผ่าน axios.delete
      const res = await axios.delete("/api/queue/delete-order", {
        params: { month, orderId },
      });
  
      if (res.status === 200) {
        // อัปเดต UI: ลบ order ที่ถูกลบออกจาก state queue
        setQueue((prevQueue) => ({
          ...prevQueue,
          [month]: prevQueue[month].filter((item) => item._id !== orderId),
        }));
      }
    } catch (error) {
      console.error("Error deleting order:", error.response?.data || error.message);
    }
  };

  // ✅ ลบ Month
  const handleDeleteMonth = async (month) => {
    if (!confirm(`⚠️ คุณต้องการลบเดือน ${month} ใช่หรือไม่?`)) return;
  
    try {
      const res = await axios.delete("/api/queue/delete-month", { data: { month } });
  
      if (res.status === 200) {
        setQueue((prevQueue) => {
          const updatedQueue = { ...prevQueue };
          delete updatedQueue[month]; // ลบเดือนออกจาก state
          return updatedQueue;
        });
      }
    } catch (error) {
      console.error("❌ Error deleting month:", error);
    }
  };

  const TestLog = () => {
    console.log(newOrders)
  }
  

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🔧 Manage Queue</h1>

      {loading ? (
        <p className="text-center">⏳ Loading queue...</p>
      ) : (
        Object.keys(queue).map((month) => (
          <div key={month} className="mb-8">
            <div className="flex gap-2 items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">{month} Queue</h2>
              <button
                onClick={() => handleDeleteMonth(month)}
                className="bg-red-500 text-white px-3 py-[1px] rounded hover:bg-red-700"
              >
                -
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 text-left border-b">Name</th>
                    <th className="py-3 px-6 text-left border-b">Detail</th>
                    <th className="py-3 px-6 text-left border-b">Status</th>
                    <th className="py-3 px-6 text-center border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {queue[month].map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="py-3 px-6 border-b">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleChange(item._id, month, "name", e.target.value)}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="py-3 px-6 border-b">
                        <input
                          type="text"
                          value={item.details}
                          onChange={(e) => handleChange(item._id, month, "details", e.target.value)}
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="py-3 px-6 border-b">
                        <select
                          value={item.status}
                          onChange={(e) => handleChange(item._id, month, "status", e.target.value)}
                          className={`p-2 rounded-lg text-white ${statusColors[item.status]}`}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-6 border-b text-center">
                        <button
                          onClick={() => handleDeleteOrder(month, item._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                          -
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* ✅ Row สำหรับเพิ่ม Queue */}
                  <tr className="hover:bg-gray-100">
                    <td className="py-3 px-6 border-b">
                      <input
                        type="text"
                        placeholder="New Name"
                        value={newOrders[month]?.name}
                        onChange={(e) =>
                          setNewOrders((prev) => ({
                            ...prev,
                            [month]: { ...prev[month], name: e.target.value },
                          }))
                        }
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="py-3 px-6 border-b">
                      <input
                        type="text"
                        placeholder="New Details"
                        value={newOrders[month]?.details}
                        onChange={(e) =>
                          setNewOrders((prev) => ({
                            ...prev,
                            [month]: { ...prev[month], details: e.target.value },
                          }))
                        }
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="py-3 px-6 border-b">
                      <select
                        value={newOrders[month]?.status}
                        onChange={(e) =>
                          setNewOrders((prev) => ({
                            ...prev,
                            [month]: { ...prev[month], status: e.target.value },
                          }))
                        }
                        className="p-2 rounded-lg text-white bg-gray-400"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-6 border-b text-center">
                      <button
                        onClick={() => handleAddOrder(month)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        +
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {/* ✅ Input สำหรับเพิ่ม Month */}
      <div className="flex flex-col item-center mt-14 gap-4">
        <h2 className="text-2xl font-semibold text-gray-700">Add new month</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter month (e.g., May 2024)"
            value={newMonth}
            onChange={(e) => setNewMonth(e.target.value)}
            className="border p-2 rounded w-1/3"
          />
          <button
            onClick={handleAddMonth}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={TestLog}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
      >
        Log
      </button>

    </div>
  );
}
