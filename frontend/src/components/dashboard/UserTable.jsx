'use client';

import { admins, printers, teachers } from "@/testdata";
import { AdjustmentsVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function UserTable({role}) {
    const [users , setUsers] = useState([]);

    useEffect(()=>{
        if(role === 'teacher') setUsers(teachers);
        else if (role === 'printer') setUsers(printers);
        else setUsers(admins);
    },[role]);

    if(users.length === 0) return(
        <div className="flex items-center justify-center my-5">
            <p className="text-gray-400">There is no {role} in your system</p>
        </div>
    )

  return (
    <table className="shadow-md rounded-[10px] w-full border border-(--borders) bg-white overflow-hidden">
    <thead className="bg-(--white-blue) w-full ">
      <tr>
        <th style={{textTransform : 'capitalize'}}>{role} Name</th>
        <th>Email</th>
        <th>Edit</th>
      </tr>
    </thead>

    <tbody>
      {users && users.map((user) => (
        <tr key={user._id} className="border-b border-(--borders)">
          <td className="p-4">{user.name}</td>
          <td className="p-4">{user.email}</td>
          <td className="p-4">
            <div className="flex items-center gap-2">
              <AdjustmentsVerticalIcon
                className="size-7 cursor-pointer circle"
                onClick={() => {
                  router.push(`${pathname}?userEdit=${user._id}`);
                }}
              />
              <TrashIcon className="size-7 cursor-pointer circle" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}
