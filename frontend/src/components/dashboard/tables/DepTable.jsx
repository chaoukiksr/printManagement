"use client";

import { deleteDepartment, getDepartments } from "@/store/department/departmentHandler";
import { setLoading } from "@/store/LoaderSlice";
import {
  AdjustmentsVerticalIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Badge from "@/components/ui/Badge";
import DepCreation from "@/components/dashboard/popups/DepCreation";
import DeletePopup from "@/components/dashboard/popups/DeletePopup";
import PrinterLoader from "@/components/ui/PrinterLoader";
import ButtonLoader from "@/components/ui/ButtonLoader";

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

  if (isFetching) return <ButtonLoader />;
  if (departments && departments.length === 0) return <div className="text-center text-gray-400">There is no admin in your system</div>;

  const tableComponent = () => (
    <div className="border border-gray-300 rounded-lg m-1 md:m-4 shadow-2xl">
      <table className="shadow-md rounded-[10px] w-full border border-(--borders) bg-white overflow-hidden hidden md:table">
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
                    onClick={() => handleUpdate(dep)}
                  />
                  <TrashIcon 
                    className="size-7 cursor-pointer circle" 
                    onClick={() => handleDelete(dep)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile version */}
      <div className="w-full p-3 md:hidden bg-white shadow-xl rounded-lg">
        {departments.map((dep, index) => (
          <div key={dep._id} className="pt-3 flex flex-col gap-3">
            <div className="flex items-center px-4">
              <span className="flex-1 font-bold">Leader</span>
              <div className="account flex-1 flex items-center gap-2">
                <div className="username">{dep.isRegistered ? dep.chefName : "Not registered"}</div>
              </div>
            </div>
            <div className="flex items-center px-4">
              <span className="flex-1 font-bold">Department</span>
              <span className="text-gray-400 flex-1">{dep.name}</span>
            </div>
            <div className="flex items-center px-4">
              <span className="flex-1 font-bold">Email</span>
              <span className="text-gray-400 flex-1">{dep.chefEmail}</span>
            </div>
            <div className="flex items-center px-4">
              <span className="flex-1 font-bold">Status</span>
              <div className="flex-1">
                <Badge status={dep.isRegistered ? "success" : "pending"}>
                  {dep.isRegistered ? "Registered" : "Pending"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-4 py-2">
              <AdjustmentsVerticalIcon
                className="size-7 cursor-pointer circle"
                onClick={() => handleUpdate(dep)}
              />
              <TrashIcon 
                className="size-7 cursor-pointer circle" 
                onClick={() => handleDelete(dep)}
              />
            </div>
            {index !== departments.length - 1 && (
              <div className="border-t border-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {tableComponent()}
      <DepCreation status={isUpdateOpen} item={selectedDep} closePopup={() => setIsUpdateOpen(false)}/>
      <DeletePopup 
        status={isDeleteOpen} 
        onDelete={() => {
          deleteDepartment(selectedDep._id, dispatch);
        }} 
        title="Are you sure you want to delete this department?" 
        closePopup={() => setIsDeleteOpen(false)}
      />
    </>
  );
}
