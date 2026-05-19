import { authClient } from "@/lib/auth-client";
import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const User = ({ user, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100"
      >
        {user.image ? (
          <div className="w-8 h-8 relative rounded-full overflow-hidden border-2 border-indigo-100">
            <Image
              src={user.image}
              alt={user.name || "User Avatar"}
              fill
              sizes="32px"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <User className="w-4 h-4" />
          </div>
        )}
        <span className="text-sm font-bold text-gray-800 max-w-25 truncate">
          {user.name}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-2 border-b border-gray-50 max-w-full">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
              Logged in as
            </p>
            <p className="text-sm font-bold text-gray-800 truncate">
              {user.email}
            </p>
          </div>
          <div className="flex flex-col px-5 py-2">
            <Link
              href="/my-listings"
              className="text-gray-600 hover:text-[#6366F1]"
            >
              My Listings
            </Link>
            <Link
              href="/my-bookings"
              className="text-gray-600 hover:text-[#6366F1]"
            >
              My Bookings
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 border-t border-gray-50 text-sm font-semibold text-red-600 hover:bg-red-50/50 flex items-center gap-2 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
