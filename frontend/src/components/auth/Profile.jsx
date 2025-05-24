"use client";

import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/auth/authSlice";
import { CameraIcon, PencilIcon, CheckIcon, XMarkIcon, EyeIcon, EyeSlashIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonLoader from "../ui/ButtonLoader";

const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const strengthText = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const strengthColor = ['red', 'orange', 'yellow', 'lime', 'green'];

  return (
    <div className="mt-1">
      <div className="flex gap-1 h-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-full transition-all duration-300 ${
              i < strength ? `bg-${strengthColor[strength - 1]}-500` : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      {password && (
        <p className={`text-sm mt-1 text-${strengthColor[strength - 1]}-500`}>
          {strengthText[strength - 1]}
        </p>
      )}
    </div>
  );
};

const PasswordRequirement = ({ met, text }) => (
  <div className="flex items-center gap-2 text-sm">
    {met ? (
      <CheckCircleIcon className="size-4 text-green-500" />
    ) : (
      <XCircleIcon className="size-4 text-gray-300" />
    )}
    <span className={met ? "text-gray-700" : "text-gray-400"}>{text}</span>
  </div>
);

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [showRequirements, setShowRequirements] = useState(false);
  const [passType1, setPassType1] = useState("password");
  const [passType2, setPassType2] = useState("password");
  const [passType3, setPassType3] = useState("password");

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
    return Object.values(requirements).every(Boolean);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword) {
      if (!validatePassword(formData.newPassword)) {
        toast.error("New password does not meet all requirements");
        return;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("New passwords don't match");
        return;
      }
    }

    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      
      // Add text fields
      formDataToSend.append("username", formData.username);
      if (formData.currentPassword) {
        formDataToSend.append("currentPassword", formData.currentPassword);
        formDataToSend.append("newPassword", formData.newPassword);
      }

      // Add image if selected
      const imageFile = fileInputRef.current?.files[0];
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(setUser(response.data.data));
      setIsEditing(false);
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setPreviewImage(null);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {/* Profile Image Section */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative group">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary relative transform transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/80">
                    <Image
                      src={previewImage || user?.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${user?.image}` : "/assets/default-avatar.jpg"}
                      alt="Profile"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full flex items-center justify-center">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center justify-center">
                        <button
                          onClick={handleImageClick}
                          className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
                        >
                          <CameraIcon className="w-6 h-6 text-white" />
                        </button>
                        <p className="text-white text-sm mt-2 text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Change Photo
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-primary">{user?.username}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white-blue text-primary text-sm font-medium">
                    {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Information Section */}
            <div className="md:col-span-2">
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 flex-wrap gap-4">
                  <h3 className="text-xl font-semibold text-primary">Profile Information</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-outline !py-2 !px-4 flex flex-1 md:flex-none items-center gap-2 hover:scale-105 transition-transform"
                  >
                    {isEditing ? (
                      <>
                        <XMarkIcon className="w-7 h-5" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <PencilIcon className="w-7 h-5" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="field group">
                      <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary transition-colors">
                        Username
                      </label>
                      <div className="input group-hover:border-primary transition-colors">
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="input bg-gray-50">
                        <input
                          type="email"
                          value={user?.email}
                          disabled
                          className="w-full text-gray-500"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="border-t border-gray-100 pt-8">
                      <h4 className="text-lg font-semibold text-primary mb-6 flex items-center gap-2">
                        <CheckIcon className="w-5 h-5" />
                        Change Password
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="field group">
                          <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary transition-colors">
                            Current Password
                          </label>
                          <div className="input group-hover:border-primary transition-colors">
                            <input
                              type={passType1}
                              name="currentPassword"
                              value={formData.currentPassword}
                              onChange={handleChange}
                              className="w-full bg-transparent"
                            />
                            {passType1 === "password" ? (
                              <EyeIcon
                                className="size-6 cursor-pointer"
                                onClick={() => setPassType1("text")}
                              />
                            ) : (
                              <EyeSlashIcon
                                className="size-6 cursor-pointer"
                                onClick={() => setPassType1("password")}
                              />
                            )}
                          </div>
                        </div>

                        <div className="field group">
                          <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary transition-colors">
                            New Password
                          </label>
                          <div className="input group-hover:border-primary transition-colors">
                            <input
                              type={passType2}
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleChange}
                              onFocus={() => setShowRequirements(true)}
                              className="w-full bg-transparent"
                            />
                            {passType2 === "password" ? (
                              <EyeIcon
                                className="size-6 cursor-pointer"
                                onClick={() => setPassType2("text")}
                              />
                            ) : (
                              <EyeSlashIcon
                                className="size-6 cursor-pointer"
                                onClick={() => setPassType2("password")}
                              />
                            )}
                          </div>
                          <PasswordStrengthIndicator password={formData.newPassword} />
                          {showRequirements && formData.newPassword && (
                            <div className="mt-2 space-y-1">
                              <PasswordRequirement
                                met={formData.newPassword.length >= 8}
                                text="At least 8 characters"
                              />
                              <PasswordRequirement
                                met={/[A-Z]/.test(formData.newPassword)}
                                text="At least one uppercase letter"
                              />
                              <PasswordRequirement
                                met={/[a-z]/.test(formData.newPassword)}
                                text="At least one lowercase letter"
                              />
                              <PasswordRequirement
                                met={/[0-9]/.test(formData.newPassword)}
                                text="At least one number"
                              />
                              <PasswordRequirement
                                met={/[^A-Za-z0-9]/.test(formData.newPassword)}
                                text="At least one special character"
                              />
                            </div>
                          )}
                        </div>

                        <div className="field group md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-primary transition-colors">
                            Confirm New Password
                          </label>
                          <div className="input group-hover:border-primary transition-colors">
                            <input
                              type={passType3}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className="w-full bg-transparent"
                            />
                            {passType3 === "password" ? (
                              <EyeIcon
                                className="size-6 cursor-pointer"
                                onClick={() => setPassType3("text")}
                              />
                            ) : (
                              <EyeSlashIcon
                                className="size-6 cursor-pointer"
                                onClick={() => setPassType3("password")}
                              />
                            )}
                          </div>
                          {formData.confirmPassword && (
                            <div className="mt-1">
                              {formData.newPassword === formData.confirmPassword ? (
                                <p className="text-sm text-green-500 flex items-center gap-1">
                                  <CheckCircleIcon className="size-4" />
                                  Passwords match
                                </p>
                              ) : (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                  <XCircleIcon className="size-4" />
                                  Passwords do not match
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {isEditing && (
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setPreviewImage(null);
                          setShowRequirements(false);
                        }}
                        className="btn-gray hover:scale-105 transition-transform"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn hover:scale-105 transition-transform"
                        disabled={isLoading}
                      >
                        {isLoading ? <ButtonLoader /> : "Save Changes"}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
