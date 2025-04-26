import {
  ArrowDownCircleIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export default function ReqForm({ reqData }) {
  return (
    <div className="req-form">
      <form>
        <div className="flex items-center flex-wrap gap-3">
          <div className="field flex-1">
            <label htmlFor="teacher-name">Teacher name</label>
            <div className="input">
              <input
                type="text"
                id="teacher-name"
                placeholder="Enter you name"
                required
                value={reqData ? reqData.teacher : ""}
                readOnly={reqData}
              />
            </div>
          </div>
          <div className="field flex-1">
            <label htmlFor="type">Type</label>
            <div className="input">
              <select
                id="type"
                required
                value={reqData ? reqData.type : ""}
                readOnly={reqData}
                disabled={reqData}
              >
                <option value="TP">TP</option>
                <option value="TD">TD</option>
                <option value="Cours">Cours</option>
                <option value="examen">examen</option>
              </select>
            </div>
          </div>
          <div className="field flex-1">
            <label htmlFor="quantity">Quantity</label>
            <div className="input">
              <input
                type="text"
                id="quantity"
                placeholder="Enter you name"
                required
                value={reqData ? reqData.quantity : ""}
                readOnly={reqData}
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
              placeholder="Write a Description about your file or request?"
              required
              value={reqData ? reqData.description : ""}
              readOnly={reqData}
            />
          </div>
        </div>

        <div className="file">
          {reqData && reqData.file ? (
            <Link
              href={reqData.file}
              target="_blank"
              className="w-full mt-4 bg-gray-100 p-2 rounded-lg flex items-center gap-2 opacity-100"
            >
              <ArrowDownCircleIcon className="size-6" />
              Open file
            </Link>
          ) : (
            <div className="w-full mt-4 bg-gray-100 p-2 rounded-lg flex items-center gap-2 opacity-60 cursor-not-allowed">
              <ArrowDownCircleIcon className="size-6" />
              No file available
            </div>
          )}

          {/* <input
            type="file"
            id="file"
            className="hidden"
            value={reqData ? (reqData.file ? reqData.file : "") : ""}
            readOnly={reqData}
            disabled={!reqData.file}
          /> */}

          <p className="text-gray-400">
            {reqData.file
              ? "Please Open the file."
              : "File is not uploaded"}
          </p>
        </div>
      </form>
    </div>
  );
}
