"use client";
import {
    ArrowLeftStartOnRectangleIcon,
  ChartBarIcon,
  DocumentIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar() {
  const pathname = usePathname();
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
            className={`flex items-center gap-3 my-4 cursor-pointer`}
          >
            <ArrowLeftStartOnRectangleIcon className="size-6" />
            <span className="font-bold lg:block md:hidden sm:block">Sign out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
