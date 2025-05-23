import Profile from "@/components/auth/Profile";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Teacher Profile",
  description: "Teacher Profile",
};

export default function page() {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <Link 
            href={"/teacher"}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <ArrowLeftIcon className="size-5 text-primary group-hover:-translate-x-1 transition-transform duration-300"/>
            <span className="text-gray-600 group-hover:text-primary font-medium">Back to Dashboard</span>
          </Link>
        </div>
      </div>
      <Profile />
    </div>
  );
}
