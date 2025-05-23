"use client";
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3BottomLeftIcon,
  BellAlertIcon,
  BellIcon,
  ChartBarIcon,
  DocumentIcon,
  UserCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { HomeIcon, UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Notification from "@/components/dashboard/Notification";
import { getNotification } from "@/store/notification/notificationHandler";
import { requests } from "@/testdata";
import Image from "next/image";
import { setSearchQuery } from "@/store/request/requestSlice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/store/auth/authHandler";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [bellStatus, setBellStatus] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { num } = useSelector((state) => state.notification);
  const { role, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (requests && Array.isArray(requests)) {
      dispatch(getNotification(requests));
    }
  }, [dispatch]);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(".sidebar");
      const trigger = document.querySelector(".sidebar-trigger");
      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        !trigger?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    // Add logout logic here
    try {
      logout(dispatch);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message || "Failed to logout");
    }

    router.push("/login");
  };

  const AccountDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity outline-0">
        <div className="username text-lg font-medium">
          {user && user.username}
        </div>
        <div className="photo">
          <Image
            src={
              user.image
                ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${user.image}`
                : "/assets/default-avatar.jpg"
            }
            alt="user"
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-200"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 bg-white rounded-xl shadow-lg border-none -translate-x-4 me-5">
        <DropdownMenuLabel className="text-lg font-semibold text-gray-700 px-2 py-1.5">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem
          onClick={() =>
            router.push(
              role === "teacher" ? "/teacher/profile" : "/printer/profile"
            )
          }
          className="flex items-center gap-3 px-2 py-2.5 text-base cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
        >
          <UserCircleIcon className="size-5 text-gray-600" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-3 px-2 py-2.5 text-base cursor-pointer hover:bg-gray-100 rounded-lg transition-colors text-red-600"
        >
          <ArrowLeftStartOnRectangleIcon className="size-5" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const AccountButton = () => (
    <Link href={"/admin/profile"}>
      <div className="account flex items-center gap-3 cursor-pointer">
        <div className="username text-lg font-medium">
          {user && user.username}
        </div>
        <div className="photo">
          <Image
            src={(user && user.image) || "/assets/default-avatar.jpg"}
            alt="user"
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-200"
          />
        </div>
      </div>
    </Link>
  );

  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(setSearchQuery(search));
  }, [search, dispatch]);

  if (!role) return null;
  const showSidebar = role === "admin" || role === "department";

  return (
    <>
      <div
        className={`navbar-dash sticky top-0 shadow-lg m-auto bg-white px-[20px] lg:px-[40px] py-[10px] z-50 ${
          role !== "admin" && role !== "department" && "lg:container"
        }`}
      >
        <div
          className={`items-center justify-between z-50  ${
            showSidebar ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="flex items-center gap-6">
            <Link href={"/"}>
              <Image src={"/logo.png"} alt="logo" width={90} height={90}/>
            </Link>
            {role === "printer" && pathname === "/printer" && (
              <SearchBar search={search} setSearch={setSearch} />
            )}
          </div>
          <div className="cta flex gap-6 items-center">
            {role === "department" && (
              <div className="relative">
                <div
                  className="notification cursor-pointer"
                  onClick={() => setBellStatus(!bellStatus)}
                >
                  {num > 0 && (
                    <span
                      className="absolute bg-red-500 text-white w-[18px] h-[18px] rounded-full flex items-center justify-center top-[-5px] right-0"
                      style={{ fontSize: "12px" }}
                    >
                      {num}
                    </span>
                  )}
                  <BellIcon className="size-7" />
                </div>
                <Notification status={bellStatus} />
              </div>
            )}
            {role === "teacher" || role === "printer" ? (
              <AccountDropdown />
            ) : (
              <AccountButton />
            )}
          </div>
        </div>

        {showSidebar && (
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
                        <span className="absolute bg-red-500 text-white w-[18px] h-[18px] rounded-full flex items-center justify-center top-[-5px] right-0">
                          {num}
                        </span>
                      )}
                      <BellIcon className="size-7" />
                    </div>
                    <Notification status={bellStatus} />
                  </div>
                )}
                {showSidebar && (
                  <div className="sidebar-trigger">
                    {isOpen ? (
                      <XMarkIcon
                        className="size-10 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      />
                    ) : (
                      <Bars3BottomLeftIcon
                        className="size-10 cursor-pointer"
                        onClick={() => setIsOpen(true)}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showSidebar && (
        <div
          className={`sidebar fixed top-[70px] transition-all duration-300 ${
            isOpen ? "right-0" : "-right-[300px]"
          } p-5 py-5 w-[271px] shadow-2xl z-40 bg-white overflow-y-auto`}
          style={{ height: "calc(100vh - 70px)" }}
        >
          <div className="content flex flex-col justify-between h-full">
            <div className="navigations">
              <div className="account flex flex-col justify-center items-center gap-3 cursor-pointer">
                <div className="photo">
                  <Image
                    src={(user && user.image) || "/assets/default-avatar.jpg"}
                    alt="user"
                    width={70}
                    height={70}
                    className="rounded-full border-2 border-gray-200"
                  />
                </div>
                <div className="username text-lg font-medium">
                  {user && user.username}
                </div>
              </div>
              <hr className="w-full my-4 border-gray-300" />
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
              <div
                className="flex items-center gap-3 my-4 cursor-pointer text-red-600 hover:opacity-80 transition-opacity"
                onClick={handleLogout}
              >
                <ArrowLeftStartOnRectangleIcon className="size-6" />
                <span className="font-bold lg:block md:hidden sm:block">
                  Sign out
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="hidden md:block relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by teacher name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[300px] pl-10 pr-4 py-2 rounded-lg border border-gray-200 "
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
      </div>
    </div>
  );
};
