"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
}

function AdminLayoutContent({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // ✅ Fix Hydration: Run on Client Only
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          
          {/* ✅ Top Navbar for Mobile (Hidden on Desktop) */}
          <nav className="bg-black text-white p-4 flex justify-between items-center sm:hidden">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <button 
              className="bg-gray-700 p-2 rounded" 
              onClick={() => setIsMenuOpen(true)}
            >
              ☰
            </button>
          </nav>

          {/* ✅ Main Layout (Flex for Desktop) */}
          <div className="flex flex-1 flex-col sm:flex-row">
            
            {/* ✅ Sidebar (Desktop View) */}
            <aside className="hidden sm:flex sm:w-64 bg-gray-800 text-white min-h-screen p-6 flex-col">
              <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
              
              {/* ✅ Navigation Menu */}
              <nav>
                <ul className="space-y-4 mb-6">
                  <li>
                    <Link href="/admin/queue" className="hover:text-gray-300">
                      Queue
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/portfolio" className="hover:text-gray-300">
                      Portfolio
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* ✅ Sign In / Sign Out Button */}
              {session ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => router.push("/admin/login")}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                >
                  Sign In
                </button>
              )}
            </aside>

            {/* ✅ Mobile Sidebar (Dropdown when menu is open) */}
            {isMenuOpen && (
              <div className="sm:hidden fixed top-0 left-0 right-0 bottom-0 bg-gray-800 text-white p-6 z-50 flex flex-col">
                {/* ✅ Close Button (X) */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Admin Panel</h2>
                  <button 
                    className="bg-gray-700 p-2 rounded text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ✕
                  </button>
                </div>
                
                {/* ✅ Navigation Menu */}
                <nav>
                  <ul className="space-y-4 mb-6">
                    <li>
                      <Link href="/admin/queue" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                        Queue
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/portfolio" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                        Portfolio
                      </Link>
                    </li>
                  </ul>
                </nav>

                {/* ✅ Sign Out Button (Directly Below Nav Menu) */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut({ callbackUrl: "/admin/login" });
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                >
                  Sign Out
                </button>
              </div>
            )}

            {/* ✅ Main Content */}
            <main className="flex-1 p-8">{children}</main>
          </div>
        </div>
    </>
  );
}
