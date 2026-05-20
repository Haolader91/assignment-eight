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

const AllRoomsPage = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || "";
  const res = await fetch(`http://localhost:5000/rooms?search=${search}`, {
    cache: "no-store",
  });
  const roomsData = await res.json();

  return (
    <div className="bg-[#fcfbfe] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <form className="mb-10 flex gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search room..."
            defaultValue={search}
            className="border px-4 py-2 rounded-lg w-full"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Search
          </button>
        </form>

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
