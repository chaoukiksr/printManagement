"use client";
import ReqTable from "@/components/dashboard/ReqTable";
import Navbar from "@/components/dashboard/Navbar";
import React, { useState } from "react";
import RequestPopup from "@/components/dashboard/RequestPopup";

export default function PrinterPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  return (
    <div>
      <Navbar />
      <div className="container m-auto mt-[60px] px-4">
        <h3 className="text-3xl font-bold">Requests</h3>
        <div className="mt-5 flex items-center gap-3 justify-between flex-wrap-reverse">
          <div
            className="filter-card flex flex-wrap gap-3 items-center bg-white p-4 px-9 shadow rounded-md m-4"
            style={{ width: "fit-content" }}
          >
            <div
              className={`all cursor-pointer ${
                selectedStatus !== "all" && "opacity-60"
              }`}
              onClick={() => setSelectedStatus("all")}
            >
              All
            </div>
            <div
              className={`completed cursor-pointer ${
                selectedStatus !== "completed" && "opacity-60"
              }`}
              onClick={() => setSelectedStatus("completed")}
            >
              Completed
            </div>
            <div
              className={`wf_printer cursor-pointer ${
                selectedStatus !== "wf_printer" && "opacity-60"
              }`}
              onClick={() => setSelectedStatus("wf_printer")}
            >
              Wait for printer
            </div>
            <div
              className={`wf_teacher cursor-pointer ${
                selectedStatus !== "wf_teacher" && "opacity-60"
              }`}
              onClick={() => setSelectedStatus("wf_teacher")}
            >
              Wait for teacher
            </div>
          </div>
        </div>
        <ReqTable selectedStatus={selectedStatus} />
      </div>

      <RequestPopup />
    </div>
  );
}
