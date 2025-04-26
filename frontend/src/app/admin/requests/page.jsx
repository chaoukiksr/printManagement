'use client';
import ReqTable from "@/components/dashboard/ReqTable";
import React, { useState } from "react";

export default function page() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  return (
    <div>
      <div
        className="filter-card flex flex-wrap gap-3 items-center bg-white p-4 px-9 shadow rounded-md m-4"
        style={{ width: "fit-content" }}
      >
        <div className="all cursor-pointer" onClick={()=> setSelectedStatus('all')}>All</div>
        <div className="completed cursor-pointer" onClick={()=> setSelectedStatus('completed')}>Completed</div>
        <div className="wait_for_printer cursor-pointer" onClick={()=> setSelectedStatus('wait_for_printer')}>Wait for printer</div>
        <div className="wait_for_teacher cursor-pointer" onClick={()=> setSelectedStatus('wait_for_teacher')}>Wait for teacher</div>
        <div className="in_progress cursor-pointer" onClick={()=> setSelectedStatus('in_progress')}>In progress</div>
        <div className="refused cursor-pointer" onClick={()=> setSelectedStatus('refused')}>Refused</div>
      </div>
      <ReqTable selectedStatus={selectedStatus}/>
    </div>
  );
}
