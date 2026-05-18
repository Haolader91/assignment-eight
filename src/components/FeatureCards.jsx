"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const FeatureCards = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1*/}
          <div className="bg-[#f7f6fe] rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition duration-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex-1 space-y-4 text-left order-2 sm:order-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0b132a]">
                List Your Room
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs">
                Have a room to share? List it on StudyNook and start earning by
                helping other students.
              </p>
              <div className="pt-2">
                <Link href="/add-room">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl px-6 py-3 shadow-lg shadow-indigo-600/10 active:scale-95 transition transform duration-150">
                    Add Your Room
                  </button>
                </Link>
              </div>
            </div>

            {/* Right side */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 relative shrink-0 order-1 sm:order-2">
              <Image
                src="/assets/list-room.svg"
                alt="List Your Room Illustration"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          {/* Card 2:*/}
          <div className="bg-[#f7f6fe] rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition duration-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left */}
            <div className="flex-1 space-y-4 text-left order-2 sm:order-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0b132a]">
                Earn & Grow
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs">
                Reach more students, get booked regularly, and grow your earning
                potential.
              </p>
            </div>

            {/* Right side */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 relative shrink-0 order-1 sm:order-2">
              <Image
                src="/assets/earn-grow.svg"
                alt="Earn & Grow"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
