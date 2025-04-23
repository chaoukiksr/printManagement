'use client';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'

export default function Register() {
    const [user, setUser] = useState({ email: "", password: "" , confpass : ""});
      const [passType1, setPassType1] = useState("password");
      const [passType2, setPassType2] = useState("password");
      
    
      const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
  return (
    <div className="register-page flex items-center justify-center h-[90vh]">
    <div className="content bg-white shadow-2xl rounded-[20px] p-[30px] min-w-[360px]">
      <h3 className="text-2xl text-center font-bold">
        Sign Up
      </h3>
      <form className="mt-5">
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
              type={passType1}
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              onChange={changeHandler}
            />
            {passType1 === "password" ? (
              <EyeIcon className="size-6 cursor-pointer" onClick={()=> setPassType1('text')}/>
            ) : (
              <EyeSlashIcon className="size-6 cursor-pointer" onClick={()=> setPassType1('password')}/>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="confpass">Confirm Password</label>
          <div className="input">
            <KeyIcon className="size-6" />
            <input
              type={passType2}
              id="confpass"
              name="confpass"
              placeholder="Confirm your password"
              required
              onChange={changeHandler}
            />
            {passType2 === "password" ? (
              <EyeIcon className="size-6 cursor-pointer" onClick={()=> setPassType2('text')}/>
            ) : (
              <EyeSlashIcon className="size-6 cursor-pointer" onClick={()=> setPassType2('password')}/>
            )}
          </div>
        </div>
        <button className="p-3 rounded-md w-full bg-(--gray-100) border border-(--borders) mt-3">
          Create Account
        </button>
      </form>
    </div>
  </div>
  )
}
