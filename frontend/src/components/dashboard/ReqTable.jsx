"use client";
import React, { useEffect, useState } from "react";
import ReqItem from "./ReqItem";
import { requests } from "@/testdata";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "@/store/notification/notificationHandler";
import { getRequests } from "@/store/request/requestHandler";
import { DocumentIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

export default function ReqTable({ selectedStatus }) {
  const { role } = useSelector((state) => state.auth);
  const { requests } = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const [filtredReq, setFiltredReq] = useState([]);

  useEffect(() => {
    dispatch(getRequests());
  }, []);

  useEffect(() => {
    if (requests) {
      setFiltredReq(requests);
    }
  }, [requests]);

  useEffect(() => {
    if (selectedStatus === "all") return setFiltredReq(requests);
    const filtring = requests.filter((req) => {
      return req.status === selectedStatus;
    });

    setFiltredReq(filtring);
  }, [selectedStatus]);

  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="border border-gray-400 rounded-lg m-4">
      <table className="w-full p-3  hidden md:table">
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Status</th>
            {role === "department" && <th>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {filtredReq.map((item) => {
            return <ReqItem key={item._id} item={item} />;
          })}
        </tbody>
      </table>

      {/* table mobile version */}
      <div className="w-full p-3 md:hidden bg-white shadow-xl rounded-lg">
        {filtredReq.map((item) => (
          <div key={item._id} className="pt-3 flex flex-col gap-3 relative"
          onClick={() => {router.push(`${pathname}?viewReq=${item._id}`)}}
          style={{cursor : 'url(/view.svg) , pointer'}}
          >
            {role === "department" && (
              <div className="absolute right-[2%]">
                <PencilSquareIcon className="size-6 cursor-pointer" />
              </div>
            )}
            <div className="flex items-center px-4">
              <span className="flex-1 font-bold">Teacher</span>
              <div className="account flex-1 flex items-center gap-2">
                <div className="photo">
                  <img
                    src="none"
                    alt=""
                    className="border-black w-[30px] h-[30px] rounded-full"
                  />
                </div>
                <div className="username">{item.teacher}</div>
              </div>
            </div>
            <div className="flex items-center px-4">
              <span className="flex-1 font-bold">Type</span>
              <div className="flex items-center gap-3 flex-1">
                <DocumentIcon className="size-6" />
                <span>{item.type}</span>
              </div>
            </div>
            <div className="flex items-center px-4">
              <span className="flex-1 font-bold">Quantity</span>
              <span className="text-gray-400 flex-1">
                {item.quantity} Pages
              </span>
            </div>
            <div className="flex items-center px-4">
              <span className="flex-1 font-bold">Status</span>
              <div className="flex-1">
                <span
                  className={`text-gray-400 flex items-center ${item.status}`}
                >
                  <li></li> {item.status.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            <div className="border border-gray-300 mt-3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
