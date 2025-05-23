"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const LogQuestion = () => {
    return (
      <div>
        {pathname === "/login" ? (
          <p className="md:text-base text-sm">
            Dont you have an account ?{" "}
            <Link href={"/register"}>Create one</Link>
          </p>
        ) : (
          <p className="md:text-base text-sm">
            You already have an account? <Link href={"/login"}>Login</Link>
          </p>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/teacher") ||
    pathname.startsWith("/printer")
  )
    return <></>;

  return (
    <div className="navbar sticky top-0 lg:container shadow-lg m-auto bg-white px-[20px] lg:px-[40px] py-[10px] lg:rounded-b-[20px] z-50">
      <div className="items-center justify-between hidden md:flex">
        <Link href={"/"}>
          <Image src={"/logo.png"} alt="logo" width={90} height={90}/>
        </Link>
        {pathname === "/login" || pathname === "/register" ? (
          LogQuestion()
        ) : (
          <>
            <div className="navigators flex items-center gap-5">
              <Link
                href={"/"}
                className={`${pathname !== "/" && "text-gray-400"}`}
              >
                Home
              </Link>
              <Link
                href={"/about"}
                className={`${pathname !== "/about" && "text-gray-400"}`}
              >
                About
              </Link>
              <Link
                href={"/how"}
                className={`${pathname !== "/how" && "text-gray-400"}`}
              >
                How?
              </Link>
            </div>
            <div className="cta flex gap-3">
              <Link href={"/register"}>
                <button className="btn">Signup</button>
              </Link>

              <Link href={"/login"}>
                <button className="btn-outline">Login</button>
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="items-center justify-between md:hidden flex">
        <Link href={"/"}>
          <h3 className="text-2xl font-bold">Name</h3>
        </Link>
        {pathname === "/login" || pathname === "/register" ? (
          LogQuestion()
        ) : (
          <>
            <Bars3BottomLeftIcon
              className="size-10 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />

            <div
              className={`sidenav absolute  flex flex-col items-start  bg-white end-0 top-[60px] shadow-lg w-[0px] ${
                isOpen && "w-[260px] p-5"
              } overflow-hidden`}
              style={{ height: "calc(100vh - 60px)", transition: "width 0.3s" }}
            >
              <div className={`navigators flex flex-col items-center gap-5 `}>
                <Link
                  href={"/"}
                  className={`${pathname !== "/" && "text-gray-400"}`}
                >
                  Home
                </Link>
                <Link
                  href={"/about"}
                  className={`${pathname !== "/about" && "text-gray-400"}`}
                >
                  About
                </Link>
                <Link
                  href={"/how"}
                  className={`${pathname !== "/how" && "text-gray-400"}`}
                >
                  How?
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
