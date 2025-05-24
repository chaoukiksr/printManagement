"use client";
import ReqTable from "@/components/dashboard/tables/ReqTable";
import React, { useState } from "react";

export default function page() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  return (
    <div>
      <div
        className="filter-card flex flex-wrap gap-3 items-center bg-white p-4 px-9 shadow rounded-md m-4"
        style={{ width: "fit-content" }}
      >
        <div
          className={`all cursor-pointer ${selectedStatus !== "all" && "opacity-60"}`}
          onClick={() => setSelectedStatus("all")}
        >
          All
        </div>
        <div
          className={`completed cursor-pointer ${selectedStatus !== "completed" && "opacity-60"}`}
          onClick={() => setSelectedStatus("completed")}
        >
          Completed
        </div>
        <div
          className={`wf_printer cursor-pointer ${selectedStatus !== "wf_printer" && "opacity-60"}`}   
          onClick={() => setSelectedStatus("wf_printer")}
        >
          Wait for printer
        </div>
        <div
          className={`wf_teacher cursor-pointer ${selectedStatus !== "wf_teacher" && "opacity-60"}`}
          onClick={() => setSelectedStatus("wf_teacher")}
        >
          Wait for teacher
        </div>
        <div
          className={`pending cursor-pointer ${selectedStatus !== "pending" && "opacity-60"}`}
          onClick={() => setSelectedStatus("pending")}
        >
          Pending
        </div>
        <div
          className={`refused cursor-pointer ${selectedStatus !== "refused" && "opacity-60"}`}
          onClick={() => setSelectedStatus("refused")}
        >
          Refused
        </div>
      </div>
      <ReqTable selectedStatus={selectedStatus} />
    </div>
  );
}
