"use client";
import { useOutsideClick } from "@/utils/outSideClick";
import { stopScroll } from "@/utils/stopScroll";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

export default function DeletePopup() {
  // handle the search params to know the deleted user
  const router = useRouter();
  const pathname = usePathname();

  const [status, setStatus] = useState(false);

  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const userId = searchParams.get("userId");

  const popupRef = useRef(null);
  useOutsideClick(popupRef, () => {
    router.push(pathname); // close popup when clicking outside
  });
  

  // Function to stop scrolling when the popup is open
  useEffect(() => {
    stopScroll(status);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", stopScroll);
    };
  }, [status]);


  useEffect(() => {
    role && userId ? setStatus(true) : setStatus(false)
  }, [searchParams]);


  if (!status) return null;
  return (
    <div className="popup">
      <div className="popup-content md:w-[600px] w-[80%]" ref={popupRef}>
        <h3 className="text-xl font-bold text-center mb-7">
          Do you want to delete this
          <span style={{ textTransform: "capitalize" }}> {role}</span>
        </h3>

        <div className="cta flex items-center gap-3 flex-wrap mt-4">
          <button className="btn-gray flex-1 min-w-[200px]">Yes</button>
          <button
            className="btn flex-1 min-w-[200px]"
            onClick={() => {
              router.push(pathname);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
