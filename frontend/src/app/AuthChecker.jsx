'use client';
import Loader from "@/components/dashboard/Loader";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "@/store/auth/authHandler";

export default function AuthChecker({fromDashboard , children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isFetching } = useSelector((state) => state.auth);

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
  }, [dispatch, router]);

  if (isFetching && fromDashboard) return <Loader />;
  if (!user && fromDashboard) return null;
  return <>{children}</>;
}
