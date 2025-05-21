"use client";

import {
  AdjustmentsVerticalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import DeletePopup from "./DeletePopup";
import {
  deleteUser,
  getPrinter,
  getSubAdmins,
  getTeachers,
} from "@/store/user/userHandler";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function UserTable({ role }) {
  const dispatch = useDispatch();
  const { printers, admins, teachers } = useSelector((state) => state.user);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetch data only once when component mounts or role changes
  useEffect(() => {
    const fetchData = async () => {
      switch (role) {
        case "teacher":
          await getTeachers(dispatch);
          break;
        case "printer":
          await getPrinter(dispatch);
          break;
        case "admin":
          await getSubAdmins(dispatch);
          break;
        default:
          break;
      }
    };

    fetchData();
  }, [role, dispatch]);

  // Get the appropriate users list based on role
  const getUsers = () => {
    switch (role) {
      case "teacher":
        return teachers;
      case "printer":
        return printers;
      case "admin":
        return admins;
      default:
        return [];
    }
  };

  const users = getUsers();

  const handleDelete = (userId) => {
    setIsDeleteOpen(true);
    setSelectedUserId(userId);
  };

  if (!users) {
    return (
      <div className="flex items-center justify-center my-5">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center my-5">
        <p className="text-gray-400">There is no {role} in your system</p>
      </div>
    );
  }

  return (
    <>
      <table className="shadow-md rounded-[10px] w-full border border-(--borders) bg-white overflow-hidden">
        <thead className="bg-(--white-blue) w-full ">
          <tr>
            <th style={{ textTransform: "capitalize" }}>{role} Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-(--borders)">
              <td className="p-4">{user.username}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <TrashIcon
                    className="size-7 cursor-pointer circle"
                    onClick={() => handleDelete(user._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeletePopup
        status={isDeleteOpen}
        onDelete={() => {
          deleteUser(selectedUserId , role , dispatch);
          setIsDeleteOpen(false);
          setSelectedUserId(null);
        }}
        closePopup={() => {
          setIsDeleteOpen(false);
          setSelectedUserId(null);
        }}
        title={`Are you sure you want to delete this ${role}?`}
      />
    </>
  );
}
