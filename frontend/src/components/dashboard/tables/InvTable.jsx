import {
  deleteInvitation,
  getInvitations,
  resendInvitation,
} from "@/store/invitation/invitationHandler";
import {
  TrashIcon,
  EnvelopeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeletePopup from "@/components/dashboard/popups/DeletePopup";
import moment from 'moment';

export default function InvTable() {
  const { invitations } = useSelector((state) => state.invitations);
  const dispatch = useDispatch();

  useEffect(() => {
    getInvitations(dispatch);
  }, [dispatch]);

  // delete invitation
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedInvitationId, setSelectedInvitationId] = useState(null);

  const handleDelete = (invitationId) => {
    setIsDeleteOpen(true);
    setSelectedInvitationId(invitationId);
  };

  if (!invitations) return null;

  if (invitations.length === 0) {
    return (
      <div className="flex items-center justify-center my-5">
        <p className="text-gray-400">There is no invitations</p>
      </div>
    );
  }

  const tableComponent = () => (
    <div className="border border-gray-300 rounded-lg m-4 shadow-2xl">
      <table className="shadow-md rounded-[10px] w-full border border-(--borders) bg-white overflow-hidden hidden md:table">
        <thead className="bg-(--white-blue) w-full ">
          <tr>
            <th style={{ textTransform: "capitalize" }}>Role</th>
            <th>Email</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {invitations.map((inv) => (
            <tr key={inv._id} className="border-b border-(--borders)">
              {console.log(inv)}
              <td className="p-4">{inv.isSubAdmin ? "Admin" : inv.role}</td>
              <td className="p-4">{inv.email}</td>
              <td className="p-4">
                <span title={moment(inv.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}>
                  {moment(inv.updatedAt).fromNow()}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <TrashIcon
                    className="size-7 cursor-pointer circle"
                    onClick={() => handleDelete(inv._id)}
                  />
                  <ArrowPathIcon
                    className="size-7 cursor-pointer circle"
                    onClick={() => resendInvitation(inv._id, dispatch)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile version */}
      <div className="w-full p-3 md:hidden bg-white shadow-xl rounded-lg">
        {invitations.map((inv, index) => (
          <div key={inv._id} className="pt-3 flex flex-col gap-3">
            <div className="flex items-center px-4">
              <span className="flex-1 font-bold">Role</span>
              <span className="text-gray-400 flex-1">
                {inv.isSubAdmin ? "Admin" : inv.role}
              </span>
            </div>
            <div className="flex items-center px-4">
              <span className="flex-1 font-bold">Email</span>
              <div className="flex items-center gap-2 flex-1">
                <EnvelopeIcon className="size-5" />
                <span className="text-gray-400">{inv.email}</span>
              </div>
            </div>
            <div className="flex items-center justify-end px-4 py-2">
              <TrashIcon
                className="size-7 cursor-pointer circle"
                onClick={() => handleDelete(inv._id)}
              />
            </div>
            {index !== invitations.length - 1 && (
              <div className="border-t border-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {tableComponent()}
      {isDeleteOpen && (
        <DeletePopup
          status={isDeleteOpen}
          onDelete={() => {
            deleteInvitation(selectedInvitationId, dispatch);
          }}
          title={"Are you sure you want to delete this invitation?"}
          closePopup={() => {
            setIsDeleteOpen(false);
            setSelectedInvitationId(null);
          }}
        />
      )}
    </div>
  );
}
