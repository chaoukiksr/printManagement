import SignupForm from "@/components/auth/SignupForm";
import FullPageLoader from "@/components/common/FullPageLoader";
import React, { Suspense } from "react";

export const metadata = {
  title : "Register | Print"
}

export default function Register() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <SignupForm />
    </Suspense>
  );
}
