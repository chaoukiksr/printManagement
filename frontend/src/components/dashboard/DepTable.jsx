"use client";

import { deleteDepartment, getDepartments } from "@/store/department/departmentHandler";
import { setLoading } from "@/store/LoaderSlice";
import {
  AdjustmentsVerticalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Badge from "../ui/Badge";
import DepCreation from "./DepCreation";
import DeletePopup from "./DeletePopup";
export default function DepTable() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { departments, isFetching, error } = useSelector(
    (state) => state.department
  );

  useEffect(() => {
    getDepartments(dispatch);
  }, [dispatch]);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDep, setSelectedDep] = useState(null);

  const handleUpdate = (dep) => {
    setSelectedDep(dep);
    setIsUpdateOpen(true);
  };      

  const handleDelete = (dep) => {
    setSelectedDep(dep);
    setIsDeleteOpen(true);
  };

  return (
    <>
      <table className="shadow-md rounded-[10px] w-full border border-(--borders) bg-white overflow-hidden">
        <thead className="bg-(--white-blue) ">
          <tr>
            <th>Leader name</th>
            <th>Department name</th>
            <th>Leader email</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dep) => (
            <tr key={dep._id} className="border-b border-(--borders)">
              <td className="p-4">
                {dep.isRegistered ? dep.chefName : "Not registered"}
              </td>
              <td className="p-4">{dep.name}</td>
              <td className="p-4">{dep.chefEmail}</td>
              <td className="p-4">
                <Badge status={dep.isRegistered ? "success" : "pending"}>
                  {dep.isRegistered ? "Registered" : "Pending"}
                </Badge>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <AdjustmentsVerticalIcon
                    className="size-7 cursor-pointer circle"
                    onClick={() => {
                      handleUpdate(dep);
                    }}
                  />
                  <TrashIcon className="size-7 cursor-pointer circle" 
                    onClick={() => {
                      handleDelete(dep);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DepCreation status={isUpdateOpen} item={selectedDep} hidePopup={() => setIsUpdateOpen(false)}/>
      <DeletePopup status={isDeleteOpen} 
      onDelete={() => {
        deleteDepartment(selectedDep._id, dispatch);
      }} title="Are you sure you want to delete this department?" 
      closePopup={() => setIsDeleteOpen(false)}
      />
    </>

  );
}
