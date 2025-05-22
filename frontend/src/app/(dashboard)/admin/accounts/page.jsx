"use client";

import DepCreation from "@/components/dashboard/DepCreation";
import DepTable from "@/components/dashboard/DepTable";
import InvTable from "@/components/dashboard/InvTable";
import UserCreation from "@/components/dashboard/UserCreation";
import UserTable from "@/components/dashboard/UserTable";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function page() {
  const { role } = useSelector((state) => state.auth);
  const { printers } = useSelector((state) => state.user);

  const [popupStatus, setPopupStatus] = useState({
    dep: false,
    printer: false,
    admin: false,
    teacher: false,
  });

  if (!role) return null;
  return (
    <div className="m-4 pb-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl md:text-3xl font-bold">
          {role === "admin" ? "Departments" : "Teachers"}
        </h3>
        <button
          className="btn flex items-center gap-3"
          onClick={() =>
            role === "admin"
              ? setPopupStatus((prev) => ({ ...prev, dep: true }))
              : setPopupStatus((prev) => ({ ...prev, teacher: true }))
          }
        >
          <PlusIcon className="size-6" />
          Add {role === "admin" ? "Department" : "Teacher"}
        </button>
      </div>

      {role === "admin" ? <DepTable /> : <UserTable role={"teacher"} />}

      {role === "admin" && (
        <>
          <div className="flex items-center justify-between my-4">
            <h3 className="text-xl md:text-3xl font-bold">Printer</h3>
            <button
              className={`btn-outline flex items-center gap-3 ${
                printers && printers.length === 1
                  ? "opacity-40 pointer-events-none"
                  : ""
              }`}
              onClick={() =>
                setPopupStatus((prev) => ({ ...prev, printer: true }))
              }
              disabled={printers && printers.length === 1}
            >
              <PlusIcon className="size-6" />
              Add Printer
            </button>
          </div>

          <UserTable role={"printer"} />
        </>
      )}

      <div className="flex items-center justify-between my-4">
        <h3 className="text-xl md:text-3xl font-bold">Admins</h3>
        <button
          className={`btn-outline flex items-center gap-3`}
          onClick={() => setPopupStatus((prev) => ({ ...prev, admin: true }))}
        >
          <PlusIcon className="size-6" />
          Add Admin
        </button>
      </div>
      <UserTable role={"admin"} />

      <div className="my-5">
        <h3 className="text-xl md:text-3xl font-bold">Invitations</h3>
        <InvTable />
      </div>

      {popupStatus.dep && (
        <DepCreation
          status={popupStatus.dep}
          hidePopup={() => setPopupStatus((prev) => ({ ...prev, dep: false }))}
        />
      )}

      {popupStatus.printer && (
        <UserCreation
          status={popupStatus.printer}
          role={"printer"}
          hidePopup={() =>
            setPopupStatus((prev) => ({ ...prev, printer: false }))
          }
        />
      )}

      {popupStatus.admin && (
        <UserCreation
          status={popupStatus.admin}
          role={"admin"}
          hidePopup={() =>
            setPopupStatus((prev) => ({ ...prev, admin: false }))
          }
        />
      )}

      {popupStatus.teacher && (
        <UserCreation
          status={popupStatus.teacher}
          role={"teacher"}
          hidePopup={() =>
            setPopupStatus((prev) => ({ ...prev, teacher: false }))
          }
        />
      )}
    </div>
  );
}
