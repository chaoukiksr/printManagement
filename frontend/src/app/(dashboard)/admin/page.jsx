"use client";
import DashCta from "@/components/dashboard/DashCta";
import DepCreation from "@/components/dashboard/popups/DepCreation";
import PaperChart from "@/components/dashboard/PaperChart";
import ReqTable from "@/components/dashboard/tables/ReqTable";
import UserCreation from "@/components/dashboard/popups/UserCreation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PrinterLoader from "@/components/ui/PrinterLoader";

export default function Home() {
  const [showPopup, setShowPopup] = useState({
    depCreation: false,
    userCreation: false,
  });
  const { role } = useSelector((state) => state.auth);

  if (!role) return <PrinterLoader />;
  if (role !== "admin" && role !== "department") return null;
  return (
    <div className="admin-home">
      <div className="flex flex-wrap">
        <PaperChart />
        <div className="flex flex-wrap xl:block">
          <DashCta
            text={
              role === "admin"
                ? "Create the deparments of your print mangment system so each one will have its own teachers"
                : "Invite new teachers to your department"
            }
            btnClass={"btn"}
            btn={role === "admin" ? `Create new department` : `Invite new teacher`}
            img={"/assets/dep.png"}
            action={() => setShowPopup({ ...showPopup, depCreation: true })}
          />
          <DashCta
            text={
              role === "admin"
                ? "Create the print admin of your print mangment system so each one will have its own printers"
                : "Invite admin to help you manage your department"
            }
            btnClass={"btn-outline"}
            btn={role === "admin" ? `Create new printer` : `Invite new admin`}
            img={"/assets/print.png"}
            action={() => setShowPopup({ ...showPopup, userCreation: true })}
          />
        </div>
      </div>
      <ReqTable selectedStatus={"all"} />
      {showPopup.depCreation && (
        <DepCreation
          status={showPopup.depCreation}
          closePopup={() => setShowPopup({ ...showPopup, depCreation: false })}
        />
      )}
      {showPopup.userCreation && (
        <UserCreation
          status={showPopup.userCreation}
          closePopup={() => setShowPopup({ ...showPopup, userCreation: false })}
          role="printer"
        />
      )}
    </div>
  );
}
