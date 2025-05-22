"use client";
import Loader from "@/components/dashboard/Loader";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "@/store/auth/authHandler";
import { redirectBaseOnRole } from "@/utils/redirect";
import toast from "react-hot-toast";
import PrinterLoader from "@/components/ui/PrinterLoader";

export default function AuthChecker({ fromDashboard, children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { user, isFetching, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (role) {
      if (
        (role === "admin" || role === "department") &&
        (pathname.startsWith("/teacher") || pathname.startsWith("/printer"))
      ) {
        toast.error("You are not authorized to access this page");
        router.push("/admin");
      }
      else if (
        role === "teacher" &&
        (pathname.startsWith("/printer") || pathname.startsWith("/admin"))
      ) {
        toast.error("You are not authorized to access this page");
        router.push("/teacher");
      }
      else if (
        role === "printer" &&
        (pathname.startsWith("/teacher") || pathname.startsWith("/admin"))
      ) {
        toast.error("You are not authorized to access this page");
        router.push("/printer");
      }
    }
  }, [role, pathname]);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await checkAuth(dispatch);
        if (!res.data && fromDashboard) {
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      }
    };
    verifyAuth();
  }, [dispatch]);

  if (isFetching && fromDashboard) return <PrinterLoader />;
  if (!user && fromDashboard) return null;
  return <>{children}</>;
}
