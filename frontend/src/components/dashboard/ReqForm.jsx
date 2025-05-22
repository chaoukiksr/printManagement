"use client";

import {
  ArrowDownCircleIcon,
  DocumentIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ButtonLoader from "../ui/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  createRequest,
  updateRequestDetails,
  updateRequestStatus,
} from "@/store/request/requestHandler";
import { toast } from "react-hot-toast";

export default function ReqForm({ reqData, closePopup }) {
  const [request, setRequest] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isFileRemoved, setIsFileRemoved] = useState(false);
  const { role } = useSelector((state) => state.auth);
  const { isFetching } = useSelector((state) => state.request);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reqData) {
      setRequest(reqData);
      if (reqData.file) {
        setPreview(reqData.file);
      }
    } else {
      setRequest({
        type: "",
        quantity: "",
        description: "",
      });
    }
  }, [reqData]);

  const handleChange = (e) => {
    setRequest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("File size should be less than 5MB");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setIsFileRemoved(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setIsFileRemoved(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Add basic request data
      formData.append("type", request.type);
      formData.append("quantity", request.quantity);
      formData.append("description", request.description);

      // Handle file
      if (file) {
        formData.append("file", file);
      } else if (isFileRemoved && reqData) {
        // If file was removed and this is an update
        formData.append("removeFile", "true");
      }

      if (reqData) {
        // Update existing request
        await dispatch(updateRequestDetails(reqData._id, formData));
      } else {
        // Create new request
        await dispatch(createRequest(formData));
      }
      closePopup();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      await dispatch(updateRequestStatus(reqData._id, status));
      closePopup();
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  if (!request || !role) return <ButtonLoader />;
  return (
    <div className="req-form">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center flex-wrap gap-3">
          {reqData && role !== "teacher" && (
            <div className="field flex-1">
              <label htmlFor="teacher-name">Teacher name</label>
              <div className="input">
                <input
                  type="text"
                  id="teacher-name"
                  placeholder="Enter you name"
                  required
                  value={request.user?.name}
                  readOnly
                />
              </div>
            </div>
          )}
          <div className="field flex-1">
            <label htmlFor="type">Type</label>
            <div className="input">
              <select
                id="type"
                name="type"
                required
                value={request.type}
                onChange={handleChange}
                disabled={role !== "teacher"}
              >
                <option value="">Document Type</option>
                <option value="Test">Test</option>
                <option value="Exam">Exam</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="field flex-1">
            <label htmlFor="quantity">Quantity</label>
            <div className="input">
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Enter the quantity you want to print"
                required
                value={request.quantity}
                onChange={handleChange}
                readOnly={role !== "teacher"}
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <div className="input">
            <textarea
              className="w-full h-30 max-h-70"
              type="text"
              id="description"
              name="description"
              placeholder="Write a Description about your file or request?"
              required
              value={request.description}
              onChange={handleChange}
              readOnly={role !== "teacher"}
            />
          </div>
        </div>

        <div className="field">
          <label>File</label>
          {role === "teacher" ? (
            <div className="file-upload-container">
              {preview ? (
                <div className="file-preview-container">
                  <div className="file-preview">
                    <DocumentIcon className="size-8 text-primary" />
                    <span className="file-name">
                      {file ? file.name : preview.replace(/^.*[\\\/]/, "")}
                    </span>
                    <div className="flex gap-2">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_SERVER_URL}/${preview}`}
                        target="_blank"
                        className="view-file"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ArrowDownCircleIcon className="size-5" />
                      </Link>
                      <button
                        type="button"
                        className="remove-file"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile();
                        }}
                      >
                        <XMarkIcon className="size-5" />
                      </button>
                    </div>
                  </div>
                  {!reqData && (
                    <button
                      type="button"
                      className="update-file mt-2"
                      onClick={() => document.getElementById("file").click()}
                    >
                      Update File
                    </button>
                  )}
                </div>
              ) : (
                <div
                  className="file-upload-area"
                  onClick={() => document.getElementById("file").click()}
                >
                  <div className="upload-placeholder">
                    <DocumentIcon className="size-8 text-gray-400" />
                    <span>Click to upload file if needed</span>
                    <span className="text-sm text-gray-400">Max size: 5MB</span>
                  </div>
                </div>
              )}
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
            </div>
          ) : (
            <div className="file-preview-container">
              {preview ? (
                <Link
                  href={`${process.env.NEXT_PUBLIC_SERVER_URL}/${preview}`}
                  target="_blank"
                  className="file-preview-link flex items-center gap-2"
                >
                  <DocumentIcon className="size-6" />
                  <span>View File</span>
                  <ArrowDownCircleIcon className="size-5" />
                </Link>
              ) : (
                <div className="no-file flex items-center gap-2">
                  <DocumentIcon className="size-6" />
                  <span>No file available</span>
                </div>
              )}
            </div>
          )}
        </div>

        {role === "teacher" ? (
          <ActionsForTeacher closePopup={closePopup} isFetching={isFetching} />
        ) : role === "printer" ? (
          <ActionsForPrinter
            onStatusUpdate={handleStatusUpdate}
            isFetching={isFetching}
          />
        ) : (
          request.status === "pending" && (
            <ActionsForDep
              onStatusUpdate={handleStatusUpdate}
              isFetching={isFetching}
            />
          )
        )}
      </form>
    </div>
  );
}

function ActionsForDep({ onStatusUpdate, isFetching }) {
  return (
    <div className="cta flex flex-wrap items-center gap-3 mt-3">
      <button
        type="button"
        className="refused flex-1 !py-4 min-w-[200px]"
        onClick={() => onStatusUpdate("refused")}
        disabled={isFetching}
      >
        {isFetching ? <ButtonLoader /> : "Refuse the request"}
      </button>
      <button
        type="button"
        className="approved flex-1 !py-4 min-w-[200px]"
        onClick={() => onStatusUpdate("wf_printer")}
        disabled={isFetching}
      >
        {isFetching ? <ButtonLoader /> : "Approve the request"}
      </button>
    </div>
  );
}

function ActionsForTeacher({ closePopup, isFetching }) {
  return (
    <div className="cta flex flex-wrap items-center gap-3 mt-3">
      <button
        type="button"
        className="btn-gray flex-1 !py-4 min-w-[200px]"
        onClick={closePopup}
        disabled={isFetching}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="btn flex-1 !py-4 min-w-[200px]"
        disabled={isFetching}
      >
        {isFetching ? <ButtonLoader /> : "Submit"}
      </button>
    </div>
  );
}

function ActionsForPrinter({ onStatusUpdate, isFetching }) {
  return (
    <div className="cta flex flex-wrap items-center gap-3 mt-3">
      <button
        type="button"
        className="refused flex-1 !py-4 min-w-[200px]"
        onClick={() => onStatusUpdate("refused")}
        disabled={isFetching}
      >
        {isFetching ? <ButtonLoader /> : "Refuse the request"}
      </button>
      <button
        type="button"
        className="approved flex-1 !py-4 min-w-[200px]"
        onClick={() => onStatusUpdate("completed")}
        disabled={isFetching}
      >
        {isFetching ? <ButtonLoader /> : "Complete the request"}
      </button>
    </div>
  );
}
