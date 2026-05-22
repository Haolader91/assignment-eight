"use client";
import { authClient } from "@/lib/auth-client";
import { Edit3, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const UserCard = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-4 text-left">
      <div className="p-5 bg-white border border-gray-50 rounded-2xl shadow-sm shadow-indigo-950/5 space-y-4">
        <p className="text-xs font-bold text-gray-400 tracking-wide uppercase">
          Owned by
        </p>

        <div className="flex items-center gap-3">
          <Image
            src={user.image}
            alt={user.name}
            width={40}
            height={40}
            className="w-11 h-11 rounded-full object-cover border border-gray-100"
          />

          <div>
            <h4 className="text-sm pb-3 font-bold text-[#0b132a]">
              {user.name}
            </h4>

            <p className="text-xs text-gray-400">{user.email}</p>

            <p className="text-xs text-gray-400">
              Member since: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
