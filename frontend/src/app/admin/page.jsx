'use client';
import DashCta from "@/components/dashboard/DashCta";
import DepCreation from "@/components/dashboard/DepCreation";
import PaperChart from "@/components/dashboard/PaperChart";
import PrinterCreation from "@/components/dashboard/PrinterCreation";
import ReqTable from "@/components/dashboard/ReqTable";
import React, { useState } from "react";

export default function Home() {
  const [showPopup, setShowPopup] = useState({
    depCreation : false ,
    printerCreation : false ,
  });


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
            img={'/assets/dep.png'}
            action={() => setShowPopup({ ...showPopup, depCreation: true })}
            />
          <DashCta
            text={"Create the print admin of your print mangment system "}
            btnClass={"btn-outline"}
            btn={"Create new printer"}
            img={"/assets/print.png"}
            action={() => setShowPopup({ ...showPopup, printerCreation: true })}
          />
        </div>
      </div>
      <ReqTable />


      <DepCreation status={showPopup.depCreation} hidePopup={()=> setShowPopup((prev)=> ({...prev , depCreation : false}))} />
      <PrinterCreation status={showPopup.printerCreation} hidePopup={()=> setShowPopup((prev)=> ({...prev , printerCreation : false}))} />
    </div>
  );
}
