"use client";
import { useSelector } from "react-redux";
import PrinterLoader from "@/components/ui/PrinterLoader";

export default function ClientLayout({ children }) {
  const { role, isFetching } = useSelector((state) => state.auth);

  if (isFetching) return <PrinterLoader />;
  if (!role || (role !== "admin" && role !== "department")) return null;

  return <div className="min-h-screen">{children}</div>;
}
