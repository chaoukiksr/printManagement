import React, { useState } from 'react';
import { XMarkIcon } from "@heroicons/react/24/outline";
import ButtonLoader from '@/components/ui/ButtonLoader';

const commonReasons = [
  "Insufficient quantity justification",
  "Incorrect document type",
  "Missing required information",
  "File format not supported",
  "Request exceeds department limits",
  "Other"
];

export default function RefusalModal({ isOpen, onClose, onConfirm, isFetching }) {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleReasonChange = (e) => {
    const value = e.target.value;
    setSelectedReason(value);
    setShowCustomInput(value === "Other");
    if (value !== "Other") {
      setCustomReason("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReason = showCustomInput ? customReason : selectedReason;
    onConfirm(finalReason);
  };

  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content md:w-[500px] w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Refuse Request</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="reason">Select Reason for Refusal</label>
            <div className="input">
              <select
                id="reason"
                value={selectedReason}
                onChange={handleReasonChange}
                required
              >
                <option value="">Select a reason</option>
                {commonReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {showCustomInput && (
            <div className="field">
              <label htmlFor="customReason">Specify Other Reason</label>
              <div className="input">
                <textarea
                  id="customReason"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  required
                  placeholder="Please provide the reason for refusal..."
                  className="w-full h-30 max-h-70"
                />
              </div>
            </div>
          )}

          <div className="cta flex flex-wrap items-center gap-3 mt-3">
            <button
              type="button"
              className="btn-gray flex-1 !py-4 min-w-[200px]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="refused flex-1 !py-4 min-w-[200px]"
              disabled={isFetching || (!selectedReason || (showCustomInput && !customReason))}
            >
              {isFetching ? <ButtonLoader /> : "Confirm Refusal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 