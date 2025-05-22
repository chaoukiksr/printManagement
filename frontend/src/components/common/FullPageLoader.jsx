"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import printerAnimation from "@/assets/printer.json";
import { useSelector } from "react-redux";

export default function FullPageLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const { loading } = useSelector((state) => state.loader);

  console.log(loading);
  

  useEffect(() => {
    if (loading) {
      setIsVisible(true);
    } else {
      // Add a small delay before hiding to allow for smooth transition
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (!isVisible && !loading) return null;

  return (
    <div
      className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-all duration-500 ${
        loading ? "opacity-100" : "opacity-0 translate-y-[-100%]"
      }`}
    >
      <div className="w-48 h-48">
        <Lottie animationData={printerAnimation} loop={true} autoplay={true} />
      </div>
    </div>
  );
}
