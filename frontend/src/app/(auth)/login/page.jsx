"use client";
import ButtonLoader from "@/components/ui/ButtonLoader";
import { checkAuth, login } from "@/store/auth/authHandler";
import { redirectBaseOnRole } from "@/utils/redirect";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {toast} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";


export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [passType, setPassType] = useState("password");

  const dispatch = useDispatch();
  const router = useRouter();
  const {isFetching , user : existingUser} = useSelector((state)=> state.auth);

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  // check the user if already logged in
  useEffect(()=>{
    if(existingUser){
      redirectBaseOnRole(existingUser.role, router, dispatch);
    }
  },[existingUser, router, dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(user, dispatch);
    
    if(res.data){
      toast.success("You have successfully logged in");
      redirectBaseOnRole(res.data.role, router, dispatch);
    }else {
      toast.success("Please verify your email !");
      router.push(`/register/verify?email=${user.email}`);
    }
  };

  return (
    <div className="login-page flex items-center justify-center h-[90vh]">
      <div className="content bg-white shadow-2xl rounded-[20px] p-[30px] min-w-[360px]">
        <h3 className="text-2xl text-center font-bold">
          Sign In To your Account
        </h3>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <div className="input">
              <EnvelopeIcon className="size-6" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={changeHandler}
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="input">
              <KeyIcon className="size-6" />
              <input
                type={passType}
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                onChange={changeHandler}
              />
              {passType === "password" ? (
                <EyeIcon className="size-6 cursor-pointer" onClick={()=> setPassType('text')}/>
              ) : (
                <EyeSlashIcon className="size-6 cursor-pointer" onClick={()=> setPassType('password')}/>
              )}
            </div>
          </div>
          <Link href={"/reset-password"}>
            <p className="text-gray-400 text-end">Forgot password ?</p>
          </Link>
          <button className="p-3 rounded-md w-full bg-(--gray-100) border border-(--borders) mt-3">
            {isFetching ? <ButtonLoader /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
