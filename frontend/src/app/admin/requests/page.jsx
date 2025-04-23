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
        <div className="approved cursor-pointer" onClick={()=> setSelectedStatus('approved')}>Approved</div>
        <div className="pending cursor-pointer" onClick={()=> setSelectedStatus('pending')}>Pending</div>
        <div className="refused cursor-pointer" onClick={()=> setSelectedStatus('refused')}>Refused</div>
      </div>
      <ReqTable selectedStatus={selectedStatus}/>
    </div>
  );
}
