"use client";

import useMyAccount from "./hooks/useMyAccount";
import AvatarDefault from "~/assets/images/avatar-default.png";
import Image from "next/image";

export default function MyAccount() {
  const { currentAccount } = useMyAccount();
  return (
    <div className="title-16 p-4 text-title-neutral-900">
      <div>My Account</div>
      <div className="mt-4 rounded-lg border border-line-neutral-400 p-4">
        <div>
          <Image
            src={currentAccount?.avatarUrl || AvatarDefault}
            className="h-[100px] w-[100px] rounded-full border"
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
}
