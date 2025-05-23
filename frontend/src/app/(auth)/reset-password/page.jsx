'use client';
import { EnvelopeIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { requestPasswordReset } from "@/store/auth/authHandler";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/ui/ButtonLoader";

export default function SetEmail() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
    
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setIsLoading(true);
      const response = await requestPasswordReset(email);

      if (response.success) {
        setIsSuccess(true);
        setCountdown(60);
        toast.success("Password reset instructions sent to your email");
      }
    } catch (error) {
      toast.error(error.message || "Failed to send reset instructions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    
    try {
      setIsLoading(true);
      const response = await requestPasswordReset(email);

      if (response.success) {
        setCountdown(60);
        toast.success("Reset instructions resent to your email");
      }
    } catch (error) {
      toast.error(error.message || "Failed to resend instructions");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!isSuccess ? (
            <>
              <h3 className="text-2xl font-bold text-center text-primary mb-2">Reset Your Password</h3>
              <p className="text-gray-500 text-center mb-6">
                Enter your email address and we'll send you instructions to reset your password
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="field group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary transition-colors">
                    Email Address
                  </label>
                  <div className="input group-hover:border-primary transition-colors">
                    <EnvelopeIcon className="size-6 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn w-full flex items-center justify-center gap-2 mt-3"
                >
                  {isLoading ? (
                    <ButtonLoader/>
                  ) : (
                    "Send Reset Instructions"
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-2">Check Your Email</h3>
                <p className="text-green-600 mb-4">
                  We've sent password reset instructions to <span className="font-medium">{email}</span>
                </p>
                <p className="text-sm text-gray-500">
                  If you don't see the email, please check your spam folder
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleResend}
                  disabled={countdown > 0 || isLoading}
                  className="btn-outline w-full flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <ButtonLoader/>
                  ) : (
                    <>
                      <ArrowPathIcon className="size-5" />
                      {countdown > 0 
                        ? `Resend in ${countdown}s` 
                        : "Resend Instructions"}
                    </>
                  )}
                </button>

                <button
                  onClick={() => router.push("/login")}
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
