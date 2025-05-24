"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="home-page container mx-auto px-[30px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="slogan text-center mt-[60px] max-w-6xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Are You Ready To Create your print managment system?
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="lg:text-[50px] text-[30px] my-2 font-bold"
        >
          <span className="text-(--gray)">
            Smart Print System for Departments
          </span>{" "}
          Easy Requests, Clear Tracking, Full Control
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-(--gray) max-w-[650px] mx-auto"
        >
          Manage print requests with ease, track department usage, and simplify
          approvals for a smoother, smarter, and more organized printing
          experience across campus.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="cta flex flex-col md:flex-row mt-[80px] gap-3 items-center justify-center"
        >
          <Link href={"/register"} className="w-full md:w-auto">
            <button className="btn w-full">
              Sign Up For new Adiministration
            </button>
          </Link>
          <Link href={"/login"} className="w-full md:w-auto">
            <button className="btn-outline w-full">Log In</button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.picture
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full mt-[50px] block"
        style={{
          filter: "drop-shadow(0 0 20px var(--primary))",
        }}
      >
        <source
          srcSet="/assets/dashboard-img.png"
          media="(min-width: 1024px)"
        />
        <source
          srcSet="/assets/dashboard-mobile.png"
          media="(max-width: 680px)"
        />

        <img src="/assets/dashboard-img.png" alt="" className="w-full" />
      </motion.picture>
      {/* <img
        src="/assets/dashboard-img.png"
        alt=""
        className="w-full mt-[50px] "
        style={{
          filter: "drop-shadow(0 0 20px var(--primary))",
        }}
      /> */}
    </div>
  );
}
