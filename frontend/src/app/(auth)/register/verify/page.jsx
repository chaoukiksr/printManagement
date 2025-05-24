import OtpVerification from "@/components/auth/OtpVerification";
import FullPageLoader from "@/components/common/FullPageLoader";
import React, { Suspense } from "react";

export const metadata = {
  title: "OTP Verification",
};

export default function VerifyPage() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <OtpVerification />
    </Suspense>
  );
}
