"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

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
              <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center font-bold text-lg rounded-lg">
                S
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                StudyNook
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-8 text-black">
            <Link href="/" className={activeLinkStyles("/")}>
              Home
            </Link>
            <Link href="/rooms" className={activeLinkStyles("/rooms")}>
              Rooms
            </Link>
            <Link href="/about" className={activeLinkStyles("/about")}>
              About
            </Link>
            <Link href="/add-room" className={activeLinkStyles("/add-room")}>
              Add Rooms
            </Link>
          </div>
          <div className="items-center space-x-4">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
