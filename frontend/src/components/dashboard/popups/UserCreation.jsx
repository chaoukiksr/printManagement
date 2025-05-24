import { createInvitation } from "@/store/invitation/invitationHandler";
import { useOutsideClick } from "@/utils/outSideClick";
import { stopScroll } from "@/utils/stopScroll";
import { Staatliches } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function UserCreation({ status, closePopup, role }) {
  const popupRef = useRef(null);
  useOutsideClick(popupRef, closePopup);

  const dispatch = useDispatch();

  // Function to stop scrolling when the popup is open
  useEffect(() => {
    stopScroll(status);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", stopScroll);
    };
  }, [status]);

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    switch(role){
      case "printer":
        createInvitation({email , role: "printer"}, dispatch)
        break;
      case "admin":
        createInvitation({email , role: "admin" , isSubAdmin: true}, dispatch)
        break;
      case "teacher": 
        createInvitation({email , role: "teacher"}, dispatch)
        break;
      case "department":
        createInvitation({email , role: "department" , isSubAdmin: true}, dispatch)
        break;
      default:
        break;
    }
    
    // Reset form data after submission
    closePopup();
  };

  if (!status) return null;

  return (
    <div className={`popup`}>
      <div className="popup-content md:w-[600px] w-[90%]" ref={popupRef}>
        <h3 className="text-xl font-bold text-center mb-7">
          <span style={{ textTransform: "capitalize" }}>{role === "department" ? "Admin" : role}</span> creation
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">
              <span style={{ textTransform: "capitalize" }}>{role === "department" ? "Admin" : role}</span> Email
            </label>
            <div className="input">
              <input
                type="email"
                id="email"
                placeholder={`Enter your ${role === "department" ? "Admin" : role} email`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <p className="text-gray-400" style={{ fontSize: "14px" }}>
              we will sent an invitation to this email so the {role === "department" ? "Admin" : role} can create
              his account.
            </p>
          </div>

          <div className="cta flex w-full items-center gap-3 mt-4 flex-wrap-reverse">
            <button
              className="btn-gray flex-grow-1 w-50"
              onClick={closePopup}
            >
              Cancel
            </button>
            <button className="btn flex-grow-1">{role === 'printer' ? 'Create the printer' : 'Add'} {role === "department" ? "Admin" : role}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
