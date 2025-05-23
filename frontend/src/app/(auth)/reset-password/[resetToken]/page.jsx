"use client";
import { EyeIcon, EyeSlashIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { resetPassword } from "@/store/auth/authHandler";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/ui/ButtonLoader";

export default function ResetPassword() {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetToken } = useParams();
  const router = useRouter();

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!passwords.password || !passwords.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (passwords.password !== passwords.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwords.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      setIsLoading(true);
      const response = await resetPassword(resetToken, passwords.password);

      if (response.success) {
        toast.success("Password has been reset successfully");
        router.push("/login");
      }
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-center text-primary mb-2">Reset Your Password</h3>
          <p className="text-gray-500 text-center mb-6">
            Please enter your new password below
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="field group">
              <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary transition-colors">
                New Password
              </label>
              <div className="input group-hover:border-primary transition-colors">
                <KeyIcon className="size-6 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={passwords.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  required
                  className="w-full bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="size-6" />
                  ) : (
                    <EyeIcon className="size-6" />
                  )}
                </button>
              </div>
            </div>

            <div className="field group">
              <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary transition-colors">
                Confirm New Password
              </label>
              <div className="input group-hover:border-primary transition-colors">
                <KeyIcon className="size-6 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  required
                  className="w-full bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="size-6" />
                  ) : (
                    <EyeIcon className="size-6" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn mt-3 w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <ButtonLoader/>
              ) : (
                "Reset Password"
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
        </div>
      </div>
    </div>
  );
}
