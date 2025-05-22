"use client";
import { logout } from "@/store/auth/authHandler";
import {
    ArrowLeftStartOnRectangleIcon,
  ChartBarIcon,
  DocumentIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout(dispatch);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Failed to logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={`sidebar  m-4 p-5 py-5 lg:w-[171px] w-[72px] xs:[171px] rounded-md shadow md:block hidden h-full`}>
      <div className="content flex flex-col justify-between h-full ">
        <div className="navigations">
          <Link href={"/admin"} prefetch={true}>
            <div
              className={`flex items-center gap-3 my-4 ${
                pathname !== "/admin" && "text-gray-400"
              }`}
            >
              <HomeIcon className="size-6" />
              <span className="font-bold lg:block md:hidden sm:block">Home</span>
            </div>
          </Link>
          <Link href={"/admin/requests"} prefetch={true}>
            <div
              className={`flex items-center gap-3 my-4 ${
                pathname !== "/admin/requests" && "text-gray-400"
              }`}
            >
              <DocumentIcon className="size-6" />
              <span className="font-bold lg:block md:hidden sm:block">Request</span>
            </div>
          </Link>
          <Link href={"#"} prefetch={true}>
            <div
              className={`flex items-center gap-3 my-4 ${
                pathname !== "/admin/statistics" && "text-gray-400"
              }`}
            >
              <ChartBarIcon className="size-6" />
              <span className="font-bold lg:block md:hidden sm:block">Statistics</span>
            </div>
          </Link>
          <Link href={"/admin/accounts"} prefetch={true}>
            <div
              className={`flex items-center gap-3 my-4 ${
                pathname !== "/admin/accounts" && "text-gray-400"
              }`}
            >
              <UserIcon className="size-6" />
              <span className="font-bold lg:block md:hidden sm:block">Accounts</span>
            </div>
          </Link>
        </div>
        <div className="signOut">
          <div
            className={`flex items-center gap-3 my-4 cursor-pointer ${isLoggingOut ? 'opacity-50' : ''}`}
            onClick={handleLogout}
          >
            <ArrowLeftStartOnRectangleIcon className="size-6" />
            <span className="font-bold lg:block md:hidden sm:block">
              {isLoggingOut ? 'Signing out...' : 'Sign out'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
