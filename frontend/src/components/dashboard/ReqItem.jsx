'use client';
import { AdjustmentsVerticalIcon, DocumentIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

export default function ReqItem({ item }) {
 const pathname = usePathname();
 const router = useRouter();


  return (
    <tr className="bg-white border-t border-gray-400"
    onClick={() => {router.push(`${pathname}?viewReq=${item._id}`)}}
    style={{cursor : 'url(/view.svg) , pointer'}}>
      <td>
        <div className="account flex items-center gap-2">
          <div className="photo">
            <img
              src="none"
              alt=""
              className="border-black w-[30px] h-[30px] rounded-full"
            />
          </div>
          <div className="username">{item.teacher}</div>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-3">
          <DocumentIcon className="size-6" />
          <span>{item.type}</span>
        </div>
      </td>
      <td>{item.quantity} Pages</td>
      <td>
        <div className={`${item.status} flex items-center `}>
          {" "}
          <li></li> {item.status}
        </div>
      </td>
      <td>
        <PencilSquareIcon className="size-6 cursor-pointer"/>
      </td>
    </tr>
  );
}
