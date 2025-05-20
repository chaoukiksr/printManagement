"use client";
import React from "react";
import ButtonLoader from "./ButtonLoader";

export default function LoadingButton({
  children,
  isLoading = false,
  disabled = false,
  className = "",
  loaderSize = "sm",
  ...props
}) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`relative inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {isLoading && (
        <ButtonLoader size={loaderSize} />
      )}
      <span className={isLoading ? "opacity-0" : "opacity-100"}>
        {children}
      </span>
    </button>
  );
} 