import Profile from "@/components/auth/Profile";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Profile page | Print Request System",
  description: "Profile page",
};

export default function page() {
  return <Profile />;
}
