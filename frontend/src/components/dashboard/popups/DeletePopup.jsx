"use client";
import { useOutsideClick } from "@/utils/outSideClick";
import { stopScroll } from "@/utils/stopScroll";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/ui/ButtonLoader";

export default function DeletePopup({ status , onDelete , title , closePopup}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);


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

  

  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete();
      closePopup();
    } catch (error) {
      console.error("Deletion failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!status) return null;
  return (
    <div className="popup">
      <div className="popup-content md:w-[600px] w-[80%]" ref={popupRef}>
        <h3 className="text-xl font-bold text-center mb-7">
          {title || `Do you want to delete this ${role ? role.charAt(0).toUpperCase() + role.slice(1) : 'item'}?`}
        </h3>

        <div className="cta flex items-center gap-3 flex-wrap mt-4">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`btn-gray flex-1 min-w-[200px] ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isDeleting ? <ButtonLoader/> : 'Yes'}
          </button>
          <button
            className="btn flex-1 min-w-[200px]"
            onClick={closePopup}
            disabled={isDeleting}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
