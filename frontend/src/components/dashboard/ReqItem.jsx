import { AdjustmentsVerticalIcon, DocumentIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function ReqItem({ item }) {
  return (
    <tr className="bg-white border-t border-gray-400 ">
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
