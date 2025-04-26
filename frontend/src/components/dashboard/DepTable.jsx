"use client";

import { setLoading } from "@/store/LoaderSlice";
import { departments } from "@/testdata";
import {
  AdjustmentsVerticalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function DepTable() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <table className="shadow-md rounded-[10px] w-full border border-(--borders) bg-white overflow-hidden">
        <thead className="bg-(--white-blue) ">
          <tr>
            <th>Leader name</th>
            <th>Department name</th>
            <th>Leader email</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dep) => (
            <tr key={dep._id} className="border-b border-(--borders)">
              <td className="p-4">{dep.leader}</td>
              <td className="p-4">{dep.name}</td>
              <td className="p-4">{dep.leaderEmail}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <AdjustmentsVerticalIcon
                    className="size-7 cursor-pointer circle"
                    onClick={() => {
                      router.push(`${pathname}?depEdit=${dep._id}`);
                    }}
                  />
                  <TrashIcon className="size-7 cursor-pointer circle" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
