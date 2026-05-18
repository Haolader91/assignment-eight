"use client";

import React from "react";
import { FaUserSecret } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { LuMousePointerClick } from "react-icons/lu";

const WhyChoose = () => {
  return (
    <section className="bg-[#fcfbfe] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b132a] mb-12 tracking-tight">
          Why Choose StudyNook?
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* 1 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 bg-[#4f46e5] text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/10">
              <LuMousePointerClick className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0b132a]">Easy Booking</h3>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs">
              Book rooms in just a few clicks.
            </p>
          </div>

          {/* 2 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 bg-[#4f46e5] text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/10">
              <IoShieldCheckmark className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0b132a]">
              Secure & Reliable
            </h3>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs">
              Safe, secure, and conflict-free bookings.
            </p>
          </div>

          {/* 3 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 bg-[#4f46e5] text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/10">
              <FaUserSecret className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0b132a]">
              Trusted by Students
            </h3>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs">
              Join hundreds of satisfied students and owners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
