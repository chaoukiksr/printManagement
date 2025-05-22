"use client";

import { requests } from "@/testdata";
import { useOutsideClick } from "@/utils/outSideClick";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReqForm from "./ReqForm";
import { stopScroll } from "@/utils/stopScroll";
import { useDispatch, useSelector } from "react-redux";
import { getRequestDetails } from "@/store/request/requestHandler";

export default function ViewReqPopup({isOpen, closePopup}) {
  const { requests } = useSelector((state) => state.request);
  const { role } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const popupRef = useRef(null);
  useOutsideClick(popupRef, () => {
    router.replace(pathname);
    closePopup();
    setStatus(false);
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reqId = searchParams.get("viewReq");


  const [req, setReq] = useState({});
  const [status, setStatus] = useState(false);

  useEffect(() => {
    stopScroll(status);
    if(isOpen){
      setStatus(true);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", stopScroll);
    };
  }, [status , isOpen]);

  useEffect(() => {
    if (reqId) {
      const res = dispatch(getRequestDetails(reqId));
      if (res.payload) {
        setReq(res.payload);
        setStatus(true);
      }
    }else{
      setReq({
        type: "",
        quantity: "",
        description: "",
        file: "",
      });

        setStatus(isOpen);
    }
  }, [isOpen]);

  if (!status) return null;
  return (
    <div className="popup">
      <div className="popup-content md:w-[600px] w-[80%]" ref={popupRef}>
        <h3 className="font-bold text-xl">Request information</h3>

        <ReqForm reqData={reqId ? req : null} />

        {req.status === "in_progress" && (
          <div className="cta flex flex-wrap items-center gap-3 mt-3">
            <button className="refused flex-1 !py-4 min-w-[200px]">
              Refuse the request
            </button>
            <button className="approved flex-1 !py-4 min-w-[200px]">
              Approve the request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
