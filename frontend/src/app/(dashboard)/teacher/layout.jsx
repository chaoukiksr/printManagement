import Navbar from "@/components/dashboard/layout/Navbar";
import React from "react";

export const metadata = {
  title: "Teacher Interface | Print Request System",
  description: "Manage your requests as a teacher with your department",
};

export default function TeacherLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

