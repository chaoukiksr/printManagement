import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function DashCta(props) {
  return (
    <div className="xl:w-[258px] min-w-[258px] m-4 flex-1">
      <div className="bg-white rounded-2xl px-[25px] py-[10px]  shadow flex flex-col items-center justify-center h-[197px]">
        <img src="/assets/print.png" alt="printer" className="" />
        <p className="text-gray-400 text-center mt-5">{props.text}</p>
      </div>
      <button className={`${props.btnClass} flex items-center justify-center gap-3 w-full mt-2`}>
        <PlusIcon className="size-6"/>
        <span>{props.btn}</span>
      </button>
    </div>
  );
}
