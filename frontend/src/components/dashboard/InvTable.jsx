import { getInvitations } from "@/store/invitation/invitationHandler";
import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function InvTable() {
  const { invitations } = useSelector((state) => state.invitations);
  const dispatch = useDispatch();

  useEffect(() => {
    getInvitations(dispatch);
  }, [dispatch]);

  if (!invitations) return null;

  if (invitations.length === 0) {
    return (
      <div className="flex items-center justify-center my-5">
        <p className="text-gray-400">There is no invitations</p>
      </div>
    );
  }

  return (
    <div>
      <table className="shadow-md rounded-[10px] w-full border border-(--borders) bg-white overflow-hidden mt-3">
        <thead className="bg-(--white-blue) w-full ">
          <tr>
            <th style={{ textTransform: "capitalize" }}>Role</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {invitations.map((inv) => (
            <tr key={inv._id} className="border-b border-(--borders)">
              <td className="p-4">{inv.isSubAdmin ? "Admin" : inv.role}</td>
              <td className="p-4">{inv.email}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <TrashIcon
                    className="size-7 cursor-pointer circle"
                    onClick={() => handleDelete(inv._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
