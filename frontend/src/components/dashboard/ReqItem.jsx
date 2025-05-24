"use client";
import { deleteRequestById } from "@/store/request/requestHandler";
import {
  AdjustmentsVerticalIcon,
  DocumentIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeletePopup from "@/components/dashboard/popups/DeletePopup";

export default function ReqItem({ item }) {
  const { role } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  
  // delete handling
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRequestClick = (e) => {
    // Prevent click if clicking on action buttons
    if (e.target.closest('.action-buttons')) return;
    
    if (role === "admin") return;
    router.push(`${pathname}?mode=view&id=${item._id}`);
  };

  return (
    <>
      <tr
        className={`bg-white border-t border-gray-300 transition-all duration-300 hover:bg-gray-50 group ${
          pathname !== "/admin" && role !== "admin" && "cursor-pointer"
        }`}
        onClick={handleRequestClick}
      >
        {(role === "admin" || role === "printer") && (
          <td className="p-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">{item.departmentName}</span>
            </div>
          </td>
        )}
        <td className="p-4">
          {role === "teacher" ? (
            <>{item.createdAt.split("T")[0]}</>
          ) : (
            <div className="account flex items-center gap-2">
              <div className="photo">
                <Image
                  src={item.user.image || "/assets/default-avatar.jpg"}
                  alt=""
                  className="border-black w-[30px] h-[30px] rounded-full transition-transform duration-300 group-hover:scale-110"
                  width={40}
                  height={40}
                />
              </div>
              <div className="username font-medium text-gray-700">{item.user.name}</div>
            </div>
          )}
        </td>
        <td className="p-4">
          <div className="flex items-center gap-3">
            <DocumentIcon className="size-6 text-primary transition-transform duration-300 group-hover:scale-110" />
            <span className="font-medium text-gray-700">{item.type}</span>
          </div>
        </td>
        <td className="p-4">
          <span className="font-medium text-gray-700">{item.quantity} Pages</span>
        </td>
        <td className="p-4">
          <div className={`${item.status} flex items-center gap-2 transition-all duration-300 group-hover:scale-105`}>
            <li></li> 
            <span className="font-medium">{item.status.replace(/_/g, " ")}</span>
          </div>
        </td>
        {role !== "admin" && (
          <td className="p-4 action-buttons">
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <AdjustmentsVerticalIcon 
                className="size-7 cursor-pointer circle hover:text-primary transition-colors duration-300" 
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`${pathname}?mode=view&id=${item._id}`);
                }}
              />
              {role === "teacher" && (
                <TrashIcon
                  className="size-7 cursor-pointer circle hover:text-red-500 transition-colors duration-300"
                  onClick={() => {
                    setIsDeleting(true);
                  }}
                />
              )}
            </div>
          </td>
        )}
      </tr>

      {isDeleting && (
        <DeletePopup
          status={isDeleting}
          closePopup={() => {
            setIsDeleting(false);
          }}
          title="Are you sure you want to delete this request?"
          onDelete={() => {
            dispatch(deleteRequestById(item._id));
            setIsDeleting(false);
          }}
        />
      )}
    </>
  );
}
