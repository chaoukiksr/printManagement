"use client";
import { register, verifyInvitation } from "@/store/auth/authHandler";
import {
  AcademicCapIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../ui/ButtonLoader";
import { useSelector, useDispatch } from "react-redux";

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

export default function SignupForm() {
  const {isFetching} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  // check if the user is invited
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const role = searchParams.get("role");
  const email = searchParams.get("email");
  const isSubAdmin = searchParams.get("isSubAdmin");

  const [user, setUser] = useState({
    username: "",
    email: email || "",
    password: "",
    confpass: "",
    facultyName: "",
    role: role || "admin",
    isSubAdmin: isSubAdmin === "true" ? true : false,
  });

  const router = useRouter();
  useEffect(() => {
    if (token && role && email) {
      setUser((prev) => ({ ...prev, email: email, role: role }));
    }
  }, [token, role, email]);

  const [passType1, setPassType1] = useState("password");
  const [passType2, setPassType2] = useState("password");
  const [showRequirements, setShowRequirements] = useState(false);

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(user.password)) {
      toast.error("Password does not meet all requirements");
      return;
    }

    if (user.password !== user.confpass) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    if (!token) {
      // register the user
      const res = await register(user);
      if (res.data.succees) {
        toast.success("You have successfully created an account");
        router.push("/login");
      }
    } else {
      // verify the invitation
      const res = await verifyInvitation({...user, token} , dispatch);
      console.log(res);
      
      if (res.success) {
        toast.success("You have successfully verified the invitation");
        router.push("/login");
      }
    }
  };

  return (
    <div className="register-page flex items-center justify-center h-[90vh] my-12">
      <div className="content bg-white shadow-2xl rounded-[20px] p-[30px] min-w-[360px]">
        <h3 className="text-2xl text-center font-bold">Sign Up</h3>
        <p className="text-center text-gray-400">
          Enter you information below to create an account .
        </p>
        <form
          className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-2"
          onSubmit={handleSubmit}
        >
          {!token && (
            <div className="field col-span-1 md:col-span-2">
              <label htmlFor="facultyName">Name of Faculty</label>
              <div className="input">
                <AcademicCapIcon className="size-6" />
                <input
                  type="text"
                  id="facultyName"
                  name="facultyName"
                  placeholder="Enter your faculty name"
                  value={user.facultyName}
                  onChange={changeHandler}
                  required
                />
              </div>
            </div>
          )}
          <div className="field  col-span-1">
            <label htmlFor="username">Full Name</label>
            <div className="input">
              <UserIcon className="size-6" />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your Full name"
                value={user.username}
                onChange={changeHandler}
                required
              />
            </div>
          </div>
          <div className="field  col-span-1">
            <label htmlFor="email">Email</label>
            <div className="input">
              <EnvelopeIcon className="size-6" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={changeHandler}
                required
                readOnly={!!token}
              />
            </div>
          </div>
          <div className="field col-span-1">
            <label htmlFor="password">Password</label>
            <div className="input">
              <KeyIcon className="size-6" />
              <input
                type={passType1}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={user.password}
                required
                onChange={changeHandler}
                onFocus={() => setShowRequirements(true)}
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
            <PasswordStrengthIndicator password={user.password} />
            {showRequirements && (
              <div className="mt-2 space-y-1">
                <PasswordRequirement
                  met={user.password.length >= 8}
                  text="At least 8 characters"
                />
                <PasswordRequirement
                  met={/[A-Z]/.test(user.password)}
                  text="At least one uppercase letter"
                />
                <PasswordRequirement
                  met={/[a-z]/.test(user.password)}
                  text="At least one lowercase letter"
                />
                <PasswordRequirement
                  met={/[0-9]/.test(user.password)}
                  text="At least one number"
                />
                <PasswordRequirement
                  met={/[^A-Za-z0-9]/.test(user.password)}
                  text="At least one special character"
                />
              </div>
            )}
          </div>
          <div className="field col-span-1">
            <label htmlFor="confpass">Confirm Password</label>
            <div className="input">
              <KeyIcon className="size-6" />
              <input
                type={passType2}
                id="confpass"
                name="confpass"
                placeholder="Confirm your password"
                value={user.confpass}
                required
                onChange={changeHandler}
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
            {user.confpass && (
              <div className="mt-1">
                {user.password === user.confpass ? (
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
          <button 
            className="col-span-1 md:col-span-2 p-3 rounded-md w-full bg-(--gray-100) border border-(--borders) mt-3"
          >
            {isFetching ? <ButtonLoader/> : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
