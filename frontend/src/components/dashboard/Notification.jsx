"use client";
import { getNotification } from "@/store/notification/notificationHandler";
import { requests } from "@/testdata";
import { BellIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Notification({ status }) {
  const { notification } = useSelector((state) => state.notification);


  return (
    <div
      className={`bg-white overflow-x-hidden overflow-y-auto max-h-[580px] rounded-lg absolute right-[-30px] top-[50px] w-[260px] md:w-[340px] shadow-xl ${
        status ? "" : "hidden"
      }`}
    >
      <div className="head bg-[#F0FBFA]">
        <div className="p-4 py-6 flex items-center gap-4 justify-center ">
          <BellIcon className="size-6" />
          <span className="font-bold">Request notification</span>
        </div>
      </div>
      <div className="body">
        {notification &&
          notification.map((req) => {
            return (
              <div key={req._id} className="border-t border-gray-400">
                <div className="p-4">
                  <p>
                    You have a new request from <b>"{req.teacher}"</b>
                  </p>
                  <div className="cta flex items-center gap-3 justify-end mt-3">
                    <button className="px-[20px] bg-(--gray-100) p-2 rounded-lg">
                      Check
                    </button>
                    <button className="approved rounded-lg">Approve</button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
