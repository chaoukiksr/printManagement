import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function DashCta(props) {
  return (
    <div className="xl:w-[258px] min-w-[258px] m-4 flex-1">
      <div className="bg-white rounded-2xl px-[25px] py-[20px]  shadow flex flex-col items-center justify-center h-[210px]">
        <img src={props.img} alt="printer" className="" />
        <p className="text-gray-400 text-center mt-5">{props.text}</p>
      </div>
      <button className={`${props.btnClass} flex items-center justify-center gap-3 w-full mt-2`}
      onClick={props.action}>
        <PlusIcon className="size-6"/>
        <span>{props.btn}</span>
      </button>
    </div>
  );
}
