import Navbar from "@/components/dashboard/layout/Navbar";
import React from "react";

export const metadata = {
  title: "Printer Interface | Print Request System",
  description: "Manage your requests as a printer with your department",
};

export default function PrinterLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
