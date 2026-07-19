import type { Metadata } from "next";
import type { ReactNode } from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <AdminNavbar />
      {children}
    </div>
  );
}
