"use client";
import { useState, useEffect } from "react";
import  "../globals.css";
import axios from "axios";

import { useSession } from "next-auth/react";
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
    
      
    </div>
  );
}
