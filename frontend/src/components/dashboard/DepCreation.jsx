"use client";

import { useOutsideClick } from "@/utils/outSideClick";
import { stopScroll } from "@/utils/stopScroll";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";


export default function DepCreation({ hidePopup, status }) {
    const popupRef = useRef(null);
    useOutsideClick(popupRef, hidePopup);

    // Function to stop scrolling when the popup is open
  useEffect(() => {
    stopScroll(status);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", stopScroll);
    };
  }, []);


  const [formData, setFormData] = useState({
    depName: "",
    depLeaderEmail: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form data after submission
    setFormData({
      depName: "",
      depLeaderEmail: "",
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  if(!status) return null;
  return (
    <div className={`popup`}>
      <div className="popup-content md:w-[600px] w-[80%]" ref={popupRef}>
        <h3 className="text-xl font-bold text-center mb-7">
          Department creation
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="field">   
            <label htmlFor="depName">Department name</label>
            <div className="input">
              <input
                type="text"
                id="depName"
                placeholder="Enter your department name"
                value={formData.depName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="depLeaderEmail">Department - Leader admin</label>
            <div className="input">
              <input
                type="email"
                id="depLeaderEmail"
                placeholder="Enter your department - leader admin"
                value={formData.depLeaderEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            <p className="text-gray-400" style={{ fontSize: "14px" }}>
              We will send an invitation to this email so the leader can create
              the department account.
            </p>
          </div>

          <div className="cta flex w-full items-center gap-3 mt-4 flex-wrap-reverse">
            <button className="btn-gray flex-grow-1 w-50" onClick={()=> hidePopup()}>Cancel</button>
            <button className="btn flex-grow-1">Create the department</button>
          </div>
        </form>
      </div>
    </div>
  );
}
