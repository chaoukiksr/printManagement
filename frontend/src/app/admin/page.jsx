import DashCta from "@/components/dashboard/DashCta";
import PaperChart from "@/components/dashboard/PaperChart";
import ReqTable from "@/components/dashboard/ReqTable";
import React from "react";

export default function Home() {
  return (
    <div className="admin-home">
      <div className="flex flex-wrap">
        <PaperChart />
        <div className="flex flex-wrap xl:block">
          <DashCta
            text={
              "Create the deparments of your print mangment system so each one will have its own teachers"
            }
            btnClass={"btn"}
            btn={"Create new department"}
          />
          <DashCta
            text={"Create the print admin of your print mangment system "}
            btnClass={"btn-outline"}
            btn={"Create new printer"}
          />
        </div>
      </div>
      <ReqTable />
    </div>
  );
}
