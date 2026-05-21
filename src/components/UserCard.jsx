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

      {/* Buttons */}
      {/* <div className="p-4 bg-white border border-gray-50 rounded-2xl shadow-sm shadow-indigo-950/5 flex flex-col gap-3">
        <button className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold text-sm py-3 rounded-xl hover:bg-gray-50 transition">
          <Edit3 className="w-4 h-4 text-indigo-500" />
          Edit Room
        </button>

        <button className="w-full flex items-center justify-center gap-2 border border-red-100 bg-red-50/30 text-red-600 font-semibold text-sm py-3 rounded-xl hover:bg-red-50 transition">
          <Trash2 className="w-4 h-4" />
          Delete Room
        </button>
      </div> */}
    </div>
  );
};

export default UserCard;
