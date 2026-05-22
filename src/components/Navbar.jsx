"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
// import User from "./User";
import { LogOut, Menu, X } from "lucide-react";
import UserComponent from "./UserComponent";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  const activeLinkStyles = (path) =>
    `text-sm font-semibold transition duration-150 ${
      isActive(path) ? "text-[#6366F1]" : "text-gray-600 hover:text-[#6366F1]"
    }`;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center gap-2">
            <Link href="/" className="flex gap-2 items-center">
              <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center font-bold text-lg rounded-lg">
                S
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                StudyNook
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-black">
            <Link href="/" className={activeLinkStyles("/")}>
              Home
            </Link>
            <Link href="/rooms" className={activeLinkStyles("/rooms")}>
              Rooms
            </Link>

            {user && (
              <>
                <Link
                  href="/add-room"
                  className={activeLinkStyles("/add-room")}
                >
                  Add Rooms
                </Link>
                <Link
                  href="/my-listings"
                  className={activeLinkStyles("/my-listings")}
                >
                  My Listings
                </Link>
                <Link
                  href="/my-bookings"
                  className={activeLinkStyles("/my-bookings")}
                >
                  My Bookings
                </Link>
              </>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 border border-gray-300 rounded-lg hover:border-indigo-600 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <UserComponent user={user} handleLogout={handleLogout} />
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 p-2 rounded-xl hover:bg-gray-50 focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-50 bg-white px-4 pt-2 pb-4 space-y-2 shadow-inner">
          <Link
            onClick={() => setIsOpen(false)}
            href="/"
            className={`${activeLinkStyles("/")} block`}
          >
            Home
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/rooms"
            className={`${activeLinkStyles("/rooms")} block`}
          >
            Rooms
          </Link>

          {user ? (
            <>
              <Link
                href="/add-room"
                onClick={() => setIsOpen(false)}
                className={`${activeLinkStyles("/add-room")} block`}
              >
                Add Room
              </Link>
              <Link
                href="/my-listings"
                onClick={() => setIsOpen(false)}
                className={`${activeLinkStyles("/my-listings")} block`}
              >
                My Listings
              </Link>
              <Link
                href="/my-bookings"
                onClick={() => setIsOpen(false)}
                className={`${activeLinkStyles("/my-bookings")} block`}
              >
                My Bookings
              </Link>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between px-3">
                <span className="text-sm font-bold text-gray-800 truncate max-w-45">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 flex items-center gap-1.5 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="pt-4 border-t border-gray-100 flex gap-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex-1 text-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 border border-gray-300 rounded-lg hover:border-indigo-600 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="flex-2 text-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
