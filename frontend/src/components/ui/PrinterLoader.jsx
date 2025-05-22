import React from "react";
import Lottie from "lottie-react";
import printerAnimation from "@/assets/printer.json";

export default function PrinterLoader() {
  
  return (
    <div
      className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-all duration-500`}
    >
      <div className="w-48 h-48">
        <Lottie animationData={printerAnimation} loop={true} autoplay={true} />
      </div>
    </div>
  );
}
