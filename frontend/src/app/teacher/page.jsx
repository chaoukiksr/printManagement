"use client";
import Navbar from "@/components/dashboard/Navbar";
import ReqTable from "@/components/dashboard/ReqTable";
import ViewReqPopup from "@/components/dashboard/ViewReqPopup";
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export default function page() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <Navbar />

      <div className="container m-auto mt-[60px] px-4">
        <h3 className="text-3xl font-bold">Requests</h3>
        <div className="mt-5 flex items-center gap-3 justify-between flex-wrap-reverse">
          <div
            className="filter-card flex flex-wrap gap-3 items-center bg-white p-4 px-9 shadow rounded-md m-4"
            style={{ width: "fit-content" }}
          >
            <div
              className="all cursor-pointer"
              onClick={() => setSelectedStatus("all")}
            >
              All
            </div>
            <div
              className="completed cursor-pointer"
              onClick={() => setSelectedStatus("completed")}
            >
              Completed
            </div>
            <div
              className="wait_for_printer cursor-pointer"
              onClick={() => setSelectedStatus("wait_for_printer")}
            >
              Wait for printer
            </div>
            <div
              className="wait_for_teacher cursor-pointer"
              onClick={() => setSelectedStatus("wait_for_teacher")}
            >
              Wait for teacher
            </div>
            <div
              className="in_progress cursor-pointer"
              onClick={() => setSelectedStatus("in_progress")}
            >
              In progress
            </div>
            <div
              className="refused cursor-pointer"
              onClick={() => setSelectedStatus("refused")}
            >
              Refused
            </div>
          </div>
          <div className="flex justify-end flex-1">
            <button className="btn flex items-center gap-3" onClick={() => setIsOpen(true)}>
              <PlusIcon className="size-6" />
              <span>New Request</span>
            </button>
          </div>
        </div>
        <ReqTable selectedStatus={selectedStatus} />
      </div>

      {isOpen && <ViewReqPopup isOpen={isOpen} closePopup={() => setIsOpen(false)}/>}
    </div>
  );
}
