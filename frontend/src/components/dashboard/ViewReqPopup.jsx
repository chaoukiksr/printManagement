"use client";

import { requests } from "@/testdata";
import { useOutsideClick } from "@/utils/outSideClick";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReqForm from "./ReqForm";
import { stopScroll } from "@/utils/stopScroll";

export default function ViewReqPopup() {
  const router = useRouter();

  const popupRef = useRef(null);
  useOutsideClick(popupRef, () => {
    router.replace(pathname);
    setStatus(false);
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reqId = searchParams.get("viewReq");

  const [req, setReq] = useState({});
  const [status, setStatus] = useState(false);

  useEffect(() => {
    stopScroll(status);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", stopScroll);
    };
  }, [status]);

  useEffect(() => {
    if (reqId) {
      const req = requests.find((req) => req._id == reqId);
      if (req) {
        setReq(req);
        setStatus(true);
      } else {
        console.log("Request not found");
      }
    }
  }, [reqId]);

  if (!reqId || !status) return null;
  return (
    <div className="popup">
      <div className="popup-content md:w-[600px] w-[80%]" ref={popupRef}>
        <h3 className="font-bold text-xl">Request information</h3>

        <ReqForm reqData={req} />

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
