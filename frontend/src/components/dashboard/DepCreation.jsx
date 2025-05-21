"use client";

import { createDepartment, updateDepartmentDetails } from "@/store/department/departmentHandler";
import { useOutsideClick } from "@/utils/outSideClick";
import { stopScroll } from "@/utils/stopScroll";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@/components/ui/LoadingButton";
import toast from "react-hot-toast";

export default function DepCreation({ hidePopup, status, item }) {
  const { user } = useSelector(state => state.auth);
  const popupRef = useRef(null);
  const dispatch = useDispatch();
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
    name: "",
    chefEmail: "",
    facultyId: user.facultyId,
  });

  // Update form data when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        chefEmail: item.chefEmail || "",
        facultyId: user.facultyId,
      });
    } else {
      setFormData({
        name: "",
        chefEmail: "",
        facultyId: user.facultyId,
      });
    }
  }, [item, user.facultyId]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (item) {
        // Update existing department
        await updateDepartmentDetails(item._id, formData, dispatch);
        toast.success("Department updated successfully");
      } else {
        // Create new department
        await createDepartment(formData, dispatch);
      }
      // Reset form data after successful submission
      setFormData({
        name: "",
        chefEmail: "",
        facultyId: user.facultyId,
      });
      hidePopup(); // Close the popup after successful creation/update
    } catch (error) {
      // Error is already handled in the handler with toast
      console.error("Department operation failed:", error);
    } finally {
      setIsSubmitting(false);
    }
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
    <div className={`popup ananhawes3lik`}>
      <div className="popup-content md:w-[600px] w-[80%]" ref={popupRef}>
        <h3 className="text-xl font-bold text-center mb-7">
          {item ? "Update Department" : "Department Creation"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Department name</label>
            <div className="input">
              <input
                type="text"
                id="name"
                placeholder="Enter your department name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="chefEmail">Department - Leader admin</label>
            <div className="input">
              <input
                type="email"
                id="chefEmail"
                placeholder="Enter your department - leader admin"
                value={formData.chefEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            <p className="text-gray-400" style={{ fontSize: "14px" }}>
              {item 
                ? "Updating the email will send a new invitation to the new email address."
                : "We will send an invitation to this email so the leader can create the department account."}
            </p>
          </div>

          <div className="cta flex w-full items-center gap-3 mt-4 flex-wrap-reverse">
            <button
              type="button"
              className="btn-gray flex-grow-1 w-50"
              onClick={hidePopup}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              className="btn flex-grow-1"
            >
              {item ? "Update Department" : "Create Department"}
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}
