"use client";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#fcfbfe] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full flex flex-col items-center">
        <h1 className="text-8xl font-extrabold text-indigo-600 tracking-widest drop-shadow-sm mb-4">
          404
        </h1>

        <h2 className="text-2xl font-bold text-[#0b132a] mb-2 tracking-tight">
          Oops! Page not found.
        </h2>

        <p className="text-sm text-gray-500 font-medium max-w-xs mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition duration-150 shadow-md hover:shadow-lg text-sm tracking-wide"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
