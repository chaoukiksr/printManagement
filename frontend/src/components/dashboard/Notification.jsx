"use client";
import { getNotification } from "@/store/notification/notificationHandler";
import { requests } from "@/testdata";
import { BellIcon, ClockIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { updateRequestStatus } from "@/store/request/requestHandler";
import toast from "react-hot-toast";
import { stopScroll } from "@/utils/stopScroll";
import { useOutsideClick } from "@/utils/outSideClick";

export default function Notification({ status }) {
  const { notification } = useSelector((state) => state.notification);
  const { requests } = useSelector((state) => state.request);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const cardRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if(status){
      setIsOpen(true);
    }else{
      setIsOpen(false);
    }
  }, [status]); 

  useEffect(() => {
    stopScroll(isOpen);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", stopScroll);
    };
  }, [isOpen]);

  useOutsideClick(cardRef, () => setIsOpen(false));


  // Update notifications when requests change
  useEffect(() => {
    if (requests) {
      dispatch(getNotification(requests));
    }
  }, [requests, dispatch]);

  const handleViewRequest = (requestId) => {
    router.push(`${pathname}?mode=view&id=${requestId}`);
  };

  const handleApproveRequest = async (requestId , file) => {
    try {
      await dispatch(updateRequestStatus(requestId, file ? "wf_printer" : "wf_teacher"));
    } catch (error) {
      toast.error(error.message || "Failed to approve request");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white overflow-hidden rounded-lg absolute right-[-30px] top-[50px] w-[260px] md:w-[340px] shadow-xl border border-gray-100"
          ref={cardRef}
        >
          <div className="head bg-gradient-to-r from-[#F0FBFA] to-[#E1F7F5]">
            <div className="p-4 py-6 flex items-center gap-4 justify-center">
              <div className="bg-white/50 p-2 rounded-lg">
                <BellIcon className="size-6 text-primary" />
              </div>
              <span className="font-bold text-primary">Request notification</span>
            </div>
          </div>
          <div className="body max-h-[400px] overflow-y-auto">
            {notification && notification.length > 0 ? (
              notification.map((req, index) => (
                <motion.div
                  key={req._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Image
                          src={req.user?.image || "/assets/default-avatar.jpg"}
                          alt={req.user?.name || "User"}
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-gray-200"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-primary/10 p-1 rounded-full">
                          <ClockIcon className="size-4 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-gray-800">
                            New request from{" "}
                            <span className="font-semibold text-primary">
                              {req.user.name}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">
                            {new Date(req.createdAt).toLocaleTimeString()}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full flex items-center gap-1">
                            <DocumentTextIcon className="size-3" />
                            {req.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="cta flex items-center gap-3 justify-end mt-3">
                      <button 
                        onClick={() => handleViewRequest(req._id)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                      >
                        <DocumentTextIcon className="size-4" />
                        <span>Check</span>
                      </button>
                      <button 
                        onClick={() => handleApproveRequest(req._id , req?.file)}
                        className="approved rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
                      >
                        <span>Approve</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BellIcon className="size-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No new notifications</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
