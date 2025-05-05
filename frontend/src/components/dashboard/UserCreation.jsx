import { useOutsideClick } from "@/utils/outSideClick";
import { stopScroll } from "@/utils/stopScroll";
import { Staatliches } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";

export default function UserCreation({ status, hidePopup, role }) {
  const popupRef = useRef(null);
  useOutsideClick(popupRef, hidePopup);

  // Function to stop scrolling when the popup is open
  useEffect(() => {
    stopScroll(status);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", stopScroll);
    };
  }, [status]);

  const [formData, setFormData] = useState({
    printer: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form data after submission
    setFormData({
      printer: "",
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  if (!status) return null;

  return (
    <div className={`popup`}>
      <div className="popup-content md:w-[600px] w-[80%]" ref={popupRef}>
        <h3 className="text-xl font-bold text-center mb-7">
          <span style={{ textTransform: "capitalize" }}>{role}</span> creation
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">
              <span style={{ textTransform: "capitalize" }}>{role}</span> Email
            </label>
            <div className="input">
              <input
                type="email"
                id="email"
                placeholder={`Enter your ${role} email`}
                value={formData.printer}
                onChange={handleInputChange}
                required
              />
            </div>
            <p className="text-gray-400" style={{ fontSize: "14px" }}>
              we will sent an invitation to this email so the {role} can create
              his account.
            </p>
          </div>

          <div className="cta flex w-full items-center gap-3 mt-4 flex-wrap-reverse">
            <button
              className="btn-gray flex-grow-1 w-50"
              onClick={() => hidePopup()}
            >
              Cancel
            </button>
            <button className="btn flex-grow-1">{role === 'printer' ? 'Create the' : 'Add'} {role}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
