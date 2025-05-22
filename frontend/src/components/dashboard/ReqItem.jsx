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
import DeletePopup from "./DeletePopup";

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
        className={`bg-white border-t border-gray-300 cursor-pointer transition-all duration-100 ${
          pathname !== "/admin" && "hover:scale-101"
        }`}
        onClick={handleRequestClick}
      >
        {(role === "admin" || role === "printer") && (
          <td>{item.departmentName}</td>
        )}
        <td>
          {role === "teacher" ? (
            <>{item.createdAt.split("T")[0]}</>
          ) : (
            <div className="account flex items-center gap-2">
              <div className="photo">
                <Image
                  src={item.user.image || "/assets/default-avatar.jpg"}
                  alt=""
                  className="border-black w-[30px] h-[30px] rounded-full"
                  width={40}
                  height={40}
                />
              </div>
              <div className="username">{item.user.name}</div>
            </div>
          )}
        </td>
        <td>
          <div className="flex items-center gap-3">
            <DocumentIcon className="size-6" />
            <span>{item.type}</span>
          </div>
        </td>
        <td>{item.quantity} Pages</td>
        <td>
          <div className={`${item.status} flex items-center`}>
            <li></li> {item.status.replace(/_/g, " ")}
          </div>
        </td>
        {role !== "admin" && (
          <td className="action-buttons flex items-center gap-2">
            <AdjustmentsVerticalIcon 
              className="size-7 cursor-pointer circle" 
              onClick={(e) => {
                e.stopPropagation();
                router.push(`${pathname}?mode=view&id=${item._id}`);
              }}
            />
            {role === "teacher" && (
              <TrashIcon
                className="size-7 cursor-pointer circle"
                onClick={() => {
                  setIsDeleting(true);
                }}
              />
            )}
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
