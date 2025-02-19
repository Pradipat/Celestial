"use client";
import { useState, useEffect } from "react";
import  "../globals.css";
import axios from "axios";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  return (
    <ProtectedAdminPage />
  );
}

function ProtectedAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ รอให้ `useSession()` โหลดก่อน
  if (status === "loading") return <h1>Loading...</h1>;

  // ✅ ป้องกันผู้ใช้ที่ไม่ได้เป็น Admin เข้าใช้
  if (!session || session.user.role !== "admin") {
    return <h1>⛔ Access Denied</h1>;
  }

  return <AdminContent />;
}

function AdminContent() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [hoveredImage, setHoveredImage] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleDoubleClick = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category);
  }

  const handleCategoryUpdate = async () => {
    if (!newCategoryName || newCategoryName === editingCategory) {
      setEditingCategory(null);
      return
    }

    try{
      const res = await axios.put("/api/update-category", { 
        oldCategory: editingCategory,
        newCategory: newCategoryName
      })

    if (res.status === 200) {
      // ✅ อัปเดต Category ใน UI
      setPortfolios((prevPortfolio) =>
        prevPortfolio.map((item) =>
          item.category === editingCategory ? { ...item, category: newCategoryName } : item
        )
      )
    }
    }catch (error){ 
      console.error("Error updating Category:", error);
    }

    setEditingCategory(null);
  }

  const handleOpenDeletePopup = (imageId) => {
    setSelectedImageId(imageId);
    setShowDeletePopup(true);
  }

  const handleConfirmDelete = async () => {
    if (!selectedImageId) return;

    try {
      await handleDeleteImage(selectedImageId);
      setShowDeletePopup(false);
    }catch (error) {
      console.error("Error deleting imgae:", error)
    }
  }

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  }

  // ✅ ดึงข้อมูล Portfolio จาก API
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await axios.get("/api/post");
        setPortfolios(res.data.portfolios);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      }
    };
    fetchPortfolios();
  }, []);

  // ✅ จัดกลุ่ม Portfolio ตาม Category
  const groupedPortfolios = {};
  portfolios.forEach((item) => {
    const category = item.category;
    if (!groupedPortfolios[category]) groupedPortfolios[category] = [];
    groupedPortfolios[category].push(item);
  });

  // ✅ ฟังก์ชันเพิ่ม Category ใหม่
  const handleAddCategory = () => {
    if (!newCategory.trim()) return; // ป้องกัน category ว่าง
    if (groupedPortfolios[newCategory]) return; // ถ้ามีอยู่แล้ว ไม่ต้องเพิ่มซ้ำ

    setPortfolios([...portfolios, { category: newCategory, _id: Date.now(), imageURL: null }]); 
    setNewCategory(""); // เคลียร์ input
  };

  // ✅ อัปโหลดภาพใหม่
  const handleUpload = async (category, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setLoading(true);
      try {
        const res = await axios.post("/api/post", { category, image: reader.result });
        setPortfolios([res.data.portfolio, ...portfolios]);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    };
  };

  // ✅ ลบรูปภาพ
  const handleDeleteImage = async (id) => { 
    if (!id) {
        console.error("❌ Error: ID is undefined or null");
        return;
    }

    setLoading(true);
    try {
      const res = await axios.delete(`/api/post?id=${id}`);
      
      setPortfolios(portfolios.filter(p => p._id !== id));
    } catch (error) {
      console.error("❌ Error deleting image:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
    
      <h1 className="text-3xl font-bold mb-6">Admin Portfolio Management</h1>

      {/* ✅ Input และปุ่มสำหรับเพิ่ม Category */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
          className="p-2 border rounded w-1/2"
        />
        <button 
          onClick={handleAddCategory} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      {Object.keys(groupedPortfolios).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 cursor-pointer"
            onDoubleClick={() => handleDoubleClick(category)}
          >
            {editingCategory === category ? (
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onBlur={handleCategoryUpdate}
                onKeyDown={(e) => e.key === "Enter" && handleCategoryUpdate()}
                className="p-1 border border-gray-300 rounded"
                autoFocus
              />
            ) : (
              category
            )}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {groupedPortfolios[category]
            .filter((item) => item.imageURL)
            .map((item) => (
              <div
                key={item._id}
                className="relative group"
                onMouseEnter={() => setHoveredImage(item._id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                  <img
                    src={item.imageURL}
                    alt={item.category}
                    className="w-full aspect-[1/0.791667] object-cover rounded-lg shadow-md"
                  />
                  {/* ✅ ปุ่มเปลี่ยน & ลบรูป เมื่อ hover */}
                  {hoveredImage === item._id && (
                    <div className="absolute rounded-lg inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center gap-2">
                      {/* ปุ่มลบรูป */}
                      <button
                        onClick={() => handleOpenDeletePopup(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            ))}
            {/* ✅ ปุ่ม + สำหรับเพิ่มรูปภาพ */}
            <label className="flex items-center justify-center bg-gray-200 rounded-lg shadow-md w-full aspect-[1/0.791667] cursor-pointer hover:bg-gray-300 transition">
              <span className="text-4xl text-gray-500">+</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUpload(category, e)}
                disabled={loading}
              />
            </label>
          </div>
        </div>
      ))}

      {/* ✅ Popup ยืนยันการลบ */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <p className="text-lg font-semibold">⚠️ Are you sure ?</p>
            <p className="text-gray-600">Do you want to DELETE ?</p>

            <div className="flex justify-end mt-4">
              <button onClick={handleCancelDelete} className="bg-red-500 mr-2 p-2 border rounded">Cancel</button>
              <button onClick={handleConfirmDelete} className="bg-green-500 text-white p-2 rounded">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ แสดง Animation วงกลมหมุนกลางจอ */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <button onClick={() => signOut({ callbackUrl: "/admin/login" })}>Logout</button>
    </div>
  );
}
