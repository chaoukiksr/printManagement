"use client";
import { register, verifyInvitation } from "@/store/auth/authHandler";
import {
  AcademicCapIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../ui/ButtonLoader";

export default function SignupForm() {
  const {isFetching} = useSelector(state => state.auth);
  // check if the user is invited
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const role = searchParams.get("role");
  const email = searchParams.get("email");

  const [user, setUser] = useState({
    username: "",
    email: email || "",
    password: "",
    confpass: "",
    facultyName: "",
    role: role || "admin",
  });

  const router = useRouter();
  useEffect(() => {
    if (token && role && email) {
      setUser((prev) => ({ ...prev, email: email, role: role }));
    }
  }, [token, role, email]);

  const [passType1, setPassType1] = useState("password");
  const [passType2, setPassType2] = useState("password");

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const res = await verifyInvitation({...user, token});
      if (res.succees) {
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
          </div>
          <button className="col-span-1 md:col-span-2 p-3 rounded-md w-full bg-(--gray-100) border border-(--borders) mt-3">
            {isFetching ? <ButtonLoader/> : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
