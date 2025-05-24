"use client";
import DashCta from "@/components/dashboard/DashCta";
import DepCreation from "@/components/dashboard/popups/DepCreation";
import PaperChart from "@/components/dashboard/charts/PaperChart";
import ReqTable from "@/components/dashboard/tables/ReqTable";
import UserCreation from "@/components/dashboard/popups/UserCreation";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PrinterLoader from "@/components/ui/PrinterLoader";
import { getStatistics } from "@/store/statistic/statisticHandler";

export default function Home() {
  const [showPopup, setShowPopup] = useState({
    depCreation: false,
    userCreation: false,
    teacherCreation: false,
    adminCreation: false,
  });
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistics("month"));
  }, []);

  if (!role) return <PrinterLoader />;
  if (role !== "admin" && role !== "department") return null;
  return (
    <div className="admin-home">
      <div className="flex flex-wrap">
        <div className="flex-1 m-4">
          <PaperChart timeRange="month" />
        </div>
        <div className="flex flex-wrap xl:block">
          <DashCta
            text={
              role === "admin"
                ? "Create the deparments of your print mangment system so each one will have its own teachers"
                : "Invite new teachers to your department"
            }
            btnClass={"btn"}
            btn={
              role === "admin" ? `Create new department` : `Invite new teacher`
            }
            img={"/assets/dep.png"}
            action={() =>
              setShowPopup({
                ...showPopup,
                [role === "admin" ? "depCreation" : "teacherCreation"]: true,
              })
            }
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
            action={() =>
              setShowPopup({
                ...showPopup,
                [role === "admin" ? "userCreation" : "adminCreation"]: true,
              })
            }
          />
        </div>
      </div>
      <ReqTable selectedStatus={"all"} showOnlyToday={true} />

      {showPopup.depCreation && role === "admin" && (
        <DepCreation
          status={showPopup.depCreation}
          closePopup={() => setShowPopup({ ...showPopup, depCreation: false })}
        />
      )}
      {showPopup.userCreation && role === "admin" && (
        <UserCreation
          status={showPopup.userCreation}
          closePopup={() => setShowPopup({ ...showPopup, userCreation: false })}
          role="printer"
        />
      )}

      {/* actions for department */}
      {showPopup.teacherCreation && role === "department" && (
        <UserCreation
          status={showPopup.teacherCreation}
          closePopup={() =>
            setShowPopup({ ...showPopup, teacherCreation: false })
          }
          role="teacher"
        />
      )}
      {showPopup.adminCreation && role === "department" && (
        <UserCreation
          status={showPopup.adminCreation}
          closePopup={() =>
            setShowPopup({ ...showPopup, adminCreation: false })
          }
          role="department"
        />
      )}
    </div>
  );
}
