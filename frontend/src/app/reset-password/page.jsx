'use client';
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export default function SetEmail() {
  const [email , setEmail] = useState('');  
    
  return (
    <div className="set-email  flex items-center justify-center h-[80vh]">
      <div className="content bg-white shadow-2xl rounded-[20px] p-[30px] min-w-[360px]">
        <h3 className="text-2xl text-center font-bold">Reset Your Password</h3>
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
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
          </div>

          <button className="p-3 rounded-md w-full bg-(--gray-100) border border-(--borders) mt-3">
            Enter email
          </button>
          <p className="text-gray-400 mt-3">
            Enter your email so we can reset your password
          </p>
        </form>
      </div>
    </div>
  );
}
