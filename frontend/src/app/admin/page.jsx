'use client';
import DashCta from "@/components/dashboard/DashCta";
import DepCreation from "@/components/dashboard/DepCreation";
import PaperChart from "@/components/dashboard/PaperChart";
import ReqTable from "@/components/dashboard/ReqTable";
import UserCreation from "@/components/dashboard/UserCreation";
import React, { useState } from "react";

export default function Home() {
  const [showPopup, setShowPopup] = useState({
    depCreation : false ,
    userCreation : false ,
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
            action={() => setShowPopup({ ...showPopup, userCreation: true })}
          />
        </div>
      </div>
      <ReqTable />


      <DepCreation status={showPopup.depCreation} hidePopup={()=> setShowPopup((prev)=> ({...prev , depCreation : false}))} />
      <UserCreation status={showPopup.userCreation} hidePopup={()=> setShowPopup((prev)=> ({...prev , userCreation : false}))} />
    </div>
  );
}
