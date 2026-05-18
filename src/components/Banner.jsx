import React from "react";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div>
      <section className="bg-[#f7f6fe] py-12 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* left  */}
            <div className="space-y-6 text-left">
              <div className="inline-block px-4 py-1.5 bg-[#eeebff] text-[#6366F1] rounded-full text-xs font-semibold tracking-wide">
                Welcome to StudyNook
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0b132a] leading-tight tracking-tight">
                Find Your Perfect <br />
                Study Room
              </h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
                Browse and book quiet, private study rooms in your library.
                <br />
                List your own room and earn.
              </p>
              <Link href="/">
                <button className="btn btn-primary bg-indigo-600 border-none hover:bg-indigo-700 text-white rounded-xl px-8 py-3">
                  Explore Courses
                </button>
              </Link>
            </div>
            {/* right  */}
            <div className="relative w-full h-85 sm:h-100">
              {/* background Shape */}
              <div
                className="absolute -left-8 -top-6 w-full h-full bg-[#c6c4d2]"
                style={{
                  borderRadius: "30% 70% 70% / 30% 30% 70%",
                }}
              />

              {/* Image */}
              <div
                className="relative w-full h-full overflow-hidden shadow-2xl shadow-indigo-950/10"
                style={{
                  borderRadius: "30% 70% 70% / 30% 30% 70%",
                }}
              >
                <Image
                  src="/assets/Banner-image.png"
                  alt="Perfect Library Study Room"
                  fill
                  priority
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-indigo-700/30 mix-blend-multiply pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
