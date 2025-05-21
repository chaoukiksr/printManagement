"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="text-center max-w-[600px]">
        <h1 className="text-[120px] font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="btn-outline flex items-center gap-2"
          >
            <ArrowLeftIcon className="size-5" />
            Go Back
          </button>
          <Link href="/" className="btn">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 