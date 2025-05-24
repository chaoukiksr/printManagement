"use client";
import React, { useEffect, useState } from "react";
import ReqItem from "@/components/dashboard/ReqItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequests,
  getRequestDetails,
  deleteRequestById,
} from "@/store/request/requestHandler";
import {
  AdjustmentsVerticalIcon,
  DocumentIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import ButtonLoader from "@/components/ui/ButtonLoader";
import DeletePopup from "../popups/DeletePopup";
import moment from 'moment';

export default function ReqTable({ selectedStatus, showOnlyToday = false }) {
  const { role } = useSelector((state) => state.auth);
  const { requests, isFetching, searchQuery } = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const [filtredReq, setFiltredReq] = useState({ today: [], other: [] });
  const pathname = usePathname();
  const router = useRouter();

  // Fetch requests on component mount
  useEffect(() => {
    dispatch(getRequests());

    // Set up polling every 5 minutes
    const pollInterval = setInterval(() => {
      dispatch(getRequests());
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(pollInterval);
  }, [dispatch]);

  // Update filtered requests when requests, selectedStatus, or searchQuery changes
  useEffect(() => {
    if (!requests) return;

    let filtered = requests;

    // Apply status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((req) => req.status === selectedStatus);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((req) =>
        req.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Separate today's requests from other days
    const today = moment().startOf('day');
    const separatedRequests = filtered.reduce((acc, req) => {
      const requestDate = moment(req.createdAt);
      if (requestDate.isSame(today, 'day')) {
        acc.today.push(req);
      } else {
        acc.other.push(req);
      }
      return acc;
    }, { today: [], other: [] });

    setFiltredReq(separatedRequests);
  }, [selectedStatus, requests, searchQuery]);

  // Handle request click
  const handleRequestClick = (requestId) => {
    if (role === "admin") return;
    router.push(`${pathname}?mode=view&id=${requestId}`);
  };

  // delete handling
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center p-8">
        <ButtonLoader />
      </div>
    );
  }

  if (requests && requests.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-400">No requests found</p>
      </div>
    );
  }

  const renderTable = (requests, title) => (
    <div className="border border-gray-300 rounded-lg m-4 shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-primary/10">
      {title && (
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarIcon className="size-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500">
                  {requests.length} {requests.length === 1 ? 'request' : 'requests'}
                </p>
              </div>
            </div>
            {title === "Today's Requests" && (
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
                <ClockIcon className="size-4 text-primary" />
                <span className="text-sm font-medium text-gray-700">
                  {moment().format('h:mm A')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      <table className="w-full p-3 hidden md:table">
        <thead>
          <tr>
            {(role === "admin" || role === "printer") && (
              <th>Department</th>
            )}
            <th>{role === "teacher" ? "Date" : "Teacher"}</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Status</th>
            {role !== "admin" && <th>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {requests.map((item) => (
            <ReqItem key={item._id} item={item} />
          ))}
        </tbody>
      </table>

      {/* Mobile version */}
      <div className="w-full p-3 md:hidden bg-white">
        {requests.map((item, index) => (
          <div
            key={item._id}
            className="pt-3 flex flex-col gap-3 relative hover:bg-gray-50 transition-colors duration-200"
            onClick={() => handleRequestClick(item._id)}
          >
            {(role === "admin" || role === "printer") && (
              <div className="flex items-center px-4">
                <span className="flex-1 font-bold">Department</span>
                <span className="text-gray-400 flex-1">
                  {item.departmentName}
                </span>
              </div>
            )}
            <div className="flex items-center px-4">
              <span className="flex-1 font-bold">
                {role === "teacher" ? "Date" : "Teacher"}
              </span>
              {role === "teacher" ? (
                <span className="flex-1">
                  {moment(item.createdAt).format('MMM D, YYYY')}
                </span>
              ) : (
                <div className="account flex-1 flex items-center gap-2">
                  <div className="photo">
                    <img
                      src={item.user?.image || "/assets/default-avatar.jpg"}
                      alt=""
                      className="border-black w-[30px] h-[30px] rounded-full"
                    />
                  </div>
                  <div className="username">{item.user?.name}</div>
                </div>
              )}
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
            {role !== "admin" && (
              <div className="flex items-center px-4 justify-end gap-2">
                <AdjustmentsVerticalIcon className="size-7 cursor-pointer circle" />
                {role === "teacher" && (
                  <TrashIcon
                    className="size-7 cursor-pointer circle"
                    onClick={() => {
                      setSelectedItem(item._id);
                      setIsDeleting(true);
                    }}
                  />
                )}
              </div>
            )}

            {index !== requests.length - 1 && (
              <div className="border-t border-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const tableComponent = () => (
    <div className={`${pathname === "/admin" && "hover:scale-101 transition-all duration-200 cursor-pointer"}`}>
      {showOnlyToday ? (
        renderTable(filtredReq.today, "Today's Requests")
      ) : (
        <div className="space-y-6">
          {filtredReq.today.length > 0 && (
            <div className="animate-fadeIn">
              {renderTable(filtredReq.today, "Today's Requests")}
            </div>
          )}
          {filtredReq.other.length > 0 && (
            <div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
              {renderTable(filtredReq.other, "Previous Requests")}
            </div>
          )}
        </div>
      )}

      {isDeleting && (
        <DeletePopup
          status={isDeleting}
          closePopup={() => {
            setIsDeleting(false);
          }}
          title="Are you sure you want to delete this request?"
          onDelete={() => {
            dispatch(deleteRequestById(selectedItem));
            setIsDeleting(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );

  if (pathname === "/admin") {
    return <Link href={"/admin/requests"}>{tableComponent()}</Link>;
  } else {
    return tableComponent();
  }
}
