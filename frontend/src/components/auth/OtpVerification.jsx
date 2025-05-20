"use client";
import { verifyOTP, resendOTP } from "@/store/auth/authHandler";
import { KeyIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function OtpVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(5);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [canResend , countdown]);

  const handleResendOTP = async () => {
    try {
      const response = await resendOTP(email);
      if (response.success) {
        toast.success("A new OTP has been sent to your email!");
        setCountdown(5);
        setCanResend(false);
      }
    } catch (error) {
      if (error.message?.includes("already verified")) {
        toast.warning("This email is already verified. Please login.");
        router.push("/login");
      } else {
        toast.error("Unable to resend OTP. Please try again later.");
      }
    }
  };

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      if (pastedData.length < 6) {
        inputRefs[pastedData.length].current.focus();
      }
    } else {
      toast.warning("Please paste only numbers");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.warning("Please enter all 6 digits of the OTP");
      return;
    }

    try {
      const response = await verifyOTP({
        email,
        otp: otpString,
      });
      if (response.success) {
        toast.success("Email verified! Redirecting to login...");
        router.push("/login");
      }
    } catch (error) {
      if (error.message?.includes("expired")) {
        toast.warning("OTP has expired. Please request a new one.");
      } else {
        toast.error("Invalid OTP. Please check and try again.");
      }
    }
  };

  return (
    <div className="register-page flex items-center justify-center h-[90vh] my-12">
      <div className="content bg-white shadow-2xl rounded-[20px] p-[30px] min-w-[360px]">
        <h3 className="text-2xl text-center font-bold">Verify Your Email</h3>
        <p className="text-center text-gray-400">
          Enter the OTP sent to your email address.
        </p>
        <form className="mt-5 grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="otp" className="mb-2 block">
              OTP Code
            </label>
            <div className="input flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl font-semibold border border-(--borders) rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              ))}
            </div>
            <div className="mt-4 text-center">
              {!canResend ? (
                <p className="text-sm text-gray-500">
                  Resend OTP in {countdown} seconds
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="p-3 rounded-md w-full bg-(--gray-100) border border-(--borders) mt-3"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
}
