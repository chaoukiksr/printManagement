"use client";

import { admins, departments, printers } from "@/testdata";
import { useOutsideClick } from "@/utils/outSideClick";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function EditAccount() {
  const router = useRouter();
  const pathname = usePathname();

  const popupRef = useRef(null);

  const searchParams = useSearchParams();
  const depId = searchParams.get("depEdit");
  const printerId = searchParams.get("printerEdit");
  const adminId = searchParams.get("adminEdit");

  const [status, setStatus] = useState(false);
  const [account, setAccount] = useState({});
  console.log("account", account);

  useOutsideClick(popupRef, () => {
    router.push(pathname);
    setStatus(false);
  });

  useEffect(() => {
    const findTheAccount = (accountId, accounts) => {
      const foundedAccount = accounts.find(
        (account) => account._id == accountId
      );
      console.log("foundedAccount", foundedAccount);

      setAccount(foundedAccount);
      return setStatus(true);
    };

    if (depId) findTheAccount(depId, departments);
    else if (printerId) findTheAccount(printerId, printers);
    else if (adminId) findTheAccount(adminId, admins);
    else {
      setStatus(false);
      router.push(pathname);
    }
  }, [searchParams]);

  if (!account || !status) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-content md:w-[600px] w-[80%]" ref={popupRef}>
        <h3 className="font-bold text-center text-2xl">
          Do you want to change the{" "}
          {depId ? "Leader" : printerId ? "Printer" : "Admin"} ?
        </h3>

        <form>
          <div className="field">
            <label htmlFor="email">
              Enter the Email f the new{" "}
              {depId ? "Leader" : printerId ? "Printer" : "Admin"}
            </label>
            <div className="input">
              <input
                type="email"
                required
                placeholder="Enter the Email"
                value={account && account.leaderEmail}
              />
            </div>
            <p className="text-gray-400" style={{ fontSize: "14px" }}>
              we will sent an invitation to this email so the New Leader can
              create his account.
            </p>
          </div>

          <div className="cta flex items-center gap-3 flex-wrap mt-4">
            <button
              className="btn-gray flex-1 min-w-[200px]"
              onClick={() => {
                router.push(pathname);
                setStatus(false);
              }}
            >
              Cancel
            </button>
            <button className="btn flex-1 min-w-[200px]">
              Change the {depId ? "Leader" : printerId ? "Printer" : "Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
