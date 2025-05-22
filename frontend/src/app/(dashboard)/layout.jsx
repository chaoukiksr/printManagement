import React from "react";
import AuthChecker from "../AuthChecker";

export default function Layout({ children }) {
  return (
    <>
      <AuthChecker fromDashboard={true}>{children}</AuthChecker>
    </>
  );
}
