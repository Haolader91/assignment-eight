import React from "react";
import {
  Heart,
  Monitor,
  Wifi,
  ShieldAlert,
  Sliders,
  Layers,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RoomsCard from "@/components/RoomsCard";
import AmenitiesFilter from "@/components/AmenitiesFilter";

const AllRoomsPage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || "";
  const amenities = resolvedSearchParams?.amenities || "";

  console.log(amenities);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms?search=${encodeURIComponent(search)}&amenities=${amenities}`,
    { cache: "no-store" },
  );

  const roomsData = await res.json();

  return (
    <div className="bg-[#fcfbfe] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              
              if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
                const url = new URL(window.location.href);
                if (url.searchParams.has('search')) {
                  url.searchParams.delete('search');
                  window.location.href = url.pathname + url.search; 
                }
              }
            `,
          }}
        /> */}

        <form
          method="GET"
          className="mb-10 flex max-w-2xl mx-auto gap-3 items-center"
        >
          {amenities && (
            <input type="hidden" name="amenities" value={amenities} />
          )}

          <div className="relative flex-1">
            <input
              type="text"
              name="search"
              placeholder="Search room..."
              key={search}
              defaultValue={search}
              className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm bg-white text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="bg-[#6366F1] hover:bg-[#5356e2] text-white px-6 py-2.5 rounded-xl text-sm font-medium transition active:scale-98 cursor-pointer"
          >
            Search
          </button>
        </form>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 mb-6 gap-4">
          <h2 className="text-2xl font-bold text-black capitalize">
            My Added Rooms ({roomsData.length})
          </h2>

          <div className="flex items-center">
            <AmenitiesFilter />
          </div>
        </div>

        {roomsData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 font-medium">No rooms found matching</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {roomsData.map((room) => (
              <RoomsCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRoomsPage;
