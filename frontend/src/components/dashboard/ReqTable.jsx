"use client";
import React, { useEffect, useState } from "react";
import ReqItem from "./ReqItem";
import { requests } from "@/testdata";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "@/store/notification/notificationHandler";
import { getRequests } from "@/store/request/requestHandler";

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
      dispatch(getNotification(requests));
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

  return (
    <div className="border border-gray-400 rounded-lg m-4 overflow-auto ">
      <table className="w-full p-3 min-w-[500px]">
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
    </div>
  );
}
