"use client";

import { useOutsideClick } from "@/utils/outSideClick";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReqForm from "./ReqForm";
import { stopScroll } from "@/utils/stopScroll";
import { useDispatch, useSelector } from "react-redux";
import { getRequestDetails } from "@/store/request/requestHandler";

export default function RequestPopup() {
  const { role } = useSelector((state) => state.auth);
  const { selectedRequest } = useSelector((state) => state.request);
  const router = useRouter();
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  // Get mode and requestId from URL
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode"); // 'view' or 'create'
  const requestId = searchParams.get("id");

  const [isOpen, setIsOpen] = useState(false);

  // Handle outside click
  useOutsideClick(popupRef, () => {
    closePopup();
  });

  // Handle scroll lock
  useEffect(() => {
    stopScroll(isOpen);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", stopScroll);
    };
  }, [isOpen]);

  // Handle popup visibility
  useEffect(() => {
    if (mode === 'view' && requestId) {
      dispatch(getRequestDetails(requestId));
      setIsOpen(true);
    } else if (mode === 'create') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [mode, requestId, dispatch]);

  const closePopup = () => {
    router.replace(pathname);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content md:w-[600px] w-[80%]" ref={popupRef}>
        <h3 className="font-bold text-xl">
          {mode === 'create' ? 'Create New Request' : 'Request Information'}
        </h3>
        <ReqForm 
          reqData={mode === 'view' ? selectedRequest : null} 
          closePopup={closePopup}
        />
      </div>
    </div>
  );
} 