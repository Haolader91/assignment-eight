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

const AllRoomsPage = async () => {
  const res = await fetch("http://localhost:5000/rooms");
  const roomsData = await res.json();

  return (
    <div className="bg-[#fcfbfe] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {roomsData.map((room) => (
            <Link href={`/rooms/${room._id}`} key={room._id}>
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl hover:shadow-indigo-950/5 transition duration-300 flex flex-col group">
                {/* Image */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={room.imageUrl}
                    alt={room.roomName}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  <button
                    className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md text-gray-500 hover:text-red-500 hover:scale-110 active:scale-95 transition"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-5 h-5 transition-colors" />
                  </button>
                </div>

                <div className="p-6 flex flex-col grow text-left space-y-3">
                  <h3 className="text-lg font-extrabold text-[#0b132a] tracking-tight line-clamp-1">
                    {room.roomName}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1">
                      {room.floor}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      {room.capacity}
                    </span>
                  </div>

                  <div className="pt-1">
                    <span className="text-lg font-bold text-[#6366F1]">
                      ${room.price}/hr
                    </span>
                  </div>

                  {/*  Icons */}
                  <div className="pt-3 flex items-center justify-between border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-gray-50 rounded-xl border border-gray-100/70 text-gray-500">
                        <Wifi className="w-4 h-4" />
                      </div>

                      <div className="p-2 bg-gray-50 rounded-xl border border-gray-100/70 text-gray-500">
                        <Monitor className="w-4 h-4" />
                      </div>

                      <div className="p-2 bg-gray-50 rounded-xl border border-gray-100/70 text-gray-500">
                        <ShieldAlert className="w-4 h-4" />
                      </div>

                      <div className="p-2 bg-gray-50 rounded-xl border border-gray-100/70 text-gray-500">
                        <Sliders className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRoomsPage;
