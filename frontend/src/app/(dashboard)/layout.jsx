import React from "react";
import AuthChecker from "../AuthChecker";
import RequestPopup from "@/components/dashboard/popups/RequestPopup";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <AuthChecker fromDashboard={true}>
        {children}
        <RequestPopup />  
      </AuthChecker>
    </div>
  );
}
