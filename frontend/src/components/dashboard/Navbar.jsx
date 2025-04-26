"use client";
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3BottomLeftIcon,
  BellAlertIcon,
  BellIcon,
  ChartBarIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { HomeIcon, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import { getNotification } from "@/store/notification/notificationHandler";
import { requests } from "@/testdata";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [bellStatus, setBellStatus] = useState(false);
  const pathname = usePathname();
  const { num } = useSelector((state) => state.notification);

  const { role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (requests && Array.isArray(requests)) {
      dispatch(getNotification(requests));
    }
  }, [dispatch]);

  return (
    <>
      <div className="navbar-dash sticky top-0 shadow-lg m-auto bg-white px-[20px] lg:px-[40px] py-[10px] z-50">
        <div className="items-center justify-between hidden md:flex z-50">
          <Link href={"/"}>
            <h3 className="text-3xl font-bold">Name</h3>
          </Link>
          <div className="cta flex gap-5 items-center">
            {role === "department" && (
              <div className="relative">
                <div
                  className="notification cursor-pointer"
                  onClick={() => setBellStatus(!bellStatus)}
                >
                  {num > 0 && (
                    <span
                      className="absolute bg-red-500 text-white w-[14px] h-[14px] rounded-full flex items-center justify-center top-[-5px] right-0"
                      style={{ fontSize: "12px" }}
                    >
                      {num}
                    </span>
                  )}
                  <BellIcon className="size-7 " />
                </div>
                <Notification status={bellStatus} />
              </div>
            )}
            <div className="account flex items-center gap-2 cursor-pointer">
              <div className="username">belkacemi</div>
              <div className="photo">
                <img
                  src="none"
                  alt=""
                  className="border-black w-[30px] h-[30px] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden z-50">
          <div className="flex items-center justify-between z-50">
            <Link href={"/"}>
              <h3 className="text-2xl font-bold">Name</h3>
            </Link>
            <div className="flex items-center gap-4">
              {role === "department" && (
                <div className="relative">
                  <div
                    className="notification cursor-pointer"
                    onClick={() => setBellStatus(!bellStatus)}
                  >
                    {num > 0 && (
                      <span className="absolute bg-red-500 text-white w-[14px] h-[14px] rounded-full flex items-center justify-center top-[-5px] right-0">
                        {num}
                      </span>
                    )}
                    <BellIcon className="size-7 " />
                  </div>
                  <Notification status={bellStatus} />
                </div>
              )}
              <Bars3BottomLeftIcon
                className="size-10 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`sidebar fixed top-[60px] transition-all duration-300 ${
          isOpen ? "right-0" : "-right-[300px]"
        }
      p-5 py-5 w-[271px] shadow-2xl z-40`}
        style={{ height: "calc(100vh - 60px)" }}
      >
        <div className="content flex flex-col justify-between h-full ">
          <div className="navigations">
            <Link href={"/admin"}>
              <div
                className={`flex items-center gap-3 my-4 ${
                  pathname !== "/admin" && "text-gray-400"
                }`}
              >
                <HomeIcon className="size-6" />
                <span className="font-bold lg:block md:hidden sm:block">
                  Home
                </span>
              </div>
            </Link>
            <Link href={"/admin/requests"}>
              <div
                className={`flex items-center gap-3 my-4 ${
                  pathname !== "/admin/requests" && "text-gray-400"
                }`}
              >
                <DocumentIcon className="size-6" />
                <span className="font-bold lg:block md:hidden sm:block">
                  Request
                </span>
              </div>
            </Link>
            <Link href={"#"}>
              <div
                className={`flex items-center gap-3 my-4 ${
                  pathname !== "/admin/statistics" && "text-gray-400"
                }`}
              >
                <ChartBarIcon className="size-6" />
                <span className="font-bold lg:block md:hidden sm:block">
                  Statistics
                </span>
              </div>
            </Link>
            <Link href={"/admin/accounts"}>
              <div
                className={`flex items-center gap-3 my-4 ${
                  pathname !== "/admin/accounts" && "text-gray-400"
                }`}
              >
                <UserIcon className="size-6" />
                <span className="font-bold lg:block md:hidden sm:block">
                  Accounts
                </span>
              </div>
            </Link>
          </div>

          <div className="">
            <div className="account flex items-center gap-2 cursor-pointer">
              <div className="photo">
                <img
                  src="none"
                  alt=""
                  className="border-black w-[30px] h-[30px] rounded-full"
                />
              </div>
              <div className="username">belkacemi</div>
            </div>
            <div className={`flex items-center gap-3 my-4 cursor-pointer`}>
              <ArrowLeftStartOnRectangleIcon className="size-6" />
              <span className="font-bold lg:block md:hidden sm:block">
                Sign out
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
