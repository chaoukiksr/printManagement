"use client";

import DepCreation from "@/components/dashboard/DepCreation";
import DepTable from "@/components/dashboard/DepTable";
import EditAccount from "@/components/dashboard/EditAccount";
import UserCreation from "@/components/dashboard/UserCreation";
import UserTable from "@/components/dashboard/UserTable";
import { printers } from "@/testdata";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function page() {
  const { role } = useSelector((state) => state.auth);

  const [popupStatus, setPopupStatus] = useState({
    dep: false,
    printer: false,
    admin : false ,
    teacher: false,
  });

  return (
    <div className="m-4 pb-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-3xl font-bold">
          {role === "admin" ? "Department" : "Teachers"}
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

      {role === "admin" ? <DepTable /> : <></>}

      {role === "admin" && (
        <>
          <div className="flex items-center justify-between my-4">
            <h3 className="text-3xl font-bold">Printer</h3>
            <button
              className={`btn-outline flex items-center gap-3 ${
                printers.length === 1 ? "opacity-40 pointer-events-none" : ""
              }`}
              onClick={() =>
                setPopupStatus((prev) => ({ ...prev, printer: true }))
              }
              disabled={printers.length === 1}
            >
              <PlusIcon className="size-6" />
              Add Printer
            </button>
          </div>

          <UserTable role={"printer"} />
        </>
      )}

      <div className="flex items-center justify-between my-4">
        <h3 className="text-3xl font-bold">Admins</h3>
        <button
          className={`btn-outline flex items-center gap-3`}
          onClick={() =>
            setPopupStatus((prev) => ({ ...prev, admin: true }))
          }
        >
          <PlusIcon className="size-6" />
          Add Admin
        </button>
      </div>
      <UserTable role={"admin"} />

      <EditAccount />
      <DepCreation
        status={popupStatus.dep}
        hidePopup={() => setPopupStatus((prev) => ({ ...prev, dep: false }))}
      />

      <UserCreation
        status={popupStatus.printer}
        role={'printer'}
        hidePopup={() =>
          setPopupStatus((prev) => ({ ...prev, printer: false }))
        }
      />


      <UserCreation
        status={popupStatus.admin}
        role={'admin'}
        hidePopup={() =>
          setPopupStatus((prev) => ({ ...prev, admin: false }))
        }
      />
    </div>
  );
}
