import BookingButton from "@/components/BookingButton";
import UserCard from "@/components/UserCard";
import { authClient } from "@/lib/auth-client";
import {
  CalendarCheck,
  ChevronLeft,
  Clock,
  Edit3,
  Heart,
  Share2,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const RoomsDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/rooms/${id}`, {
    cache: "no-store",
  });
  const room = await res.json();
  // console.log(room);

  if (!room) {
    return <div className="p-10">Room not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#fcfbfe] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition">
            <ChevronLeft className="w-4 h-4" />
            Back to Rooms
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2.5 bg-white border border-gray-100 rounded-full text-gray-500 hover:bg-gray-50 transition shadow-sm">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2.5 bg-white border border-gray-100 rounded-full text-gray-500 hover:text-red-500 hover:bg-gray-50 transition shadow-sm">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-lg shadow-indigo-950/5">
          <Image
            src={room?.imageUrl}
            alt={room?.roomName || "Room Image"}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
          <div className="md:col-span-2 space-y-6 text-left">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b132a]">
                {room.roomName}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-gray-500">
                <span className="bg-gray-100 px-2.5 py-0.5 rounded-md text-xs font-bold text-gray-600">
                  {room.floor}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-800">{room.rating}</span>
                  <span className="text-gray-400">
                    ({room.reviewsCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {room.description}
            </p>

            <div className="grid grid-cols-3 gap-4 p-4 bg-white border border-gray-50 rounded-2xl shadow-sm shadow-indigo-950/5">
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left p-2">
                <div className="p-2.5 bg-indigo-50 text-[#6366F1] rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Capacity</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-800">
                    {room.capacity}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left p-2 border-x border-gray-100">
                <div className="p-2.5 bg-indigo-50 text-[#6366F1] rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    Hourly Rate
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-[#6366F1]">
                    ${room.price}/hr
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left p-2">
                <div className="p-2.5 bg-indigo-50 text-[#6366F1] rounded-xl">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    Booking Count
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-gray-800">
                    {room.bookingCount} times
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0b132a]">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {room?.amenities &&
                  Object.entries(room.amenities).map(([key, value]) =>
                    value ? (
                      <span
                        key={key}
                        className="px-3 py-1 bg-gray-100 rounded-xl text-xs text-black"
                      >
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                    ) : null,
                  )}
                <span className="px-3 py-2 text-xs font-bold text-indigo-500 bg-indigo-50/50 rounded-xl cursor-pointer">
                  +1 more
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-base font-bold text-[#0b132a]">
                About This Room
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {room.description}
              </p>
            </div>
          </div>

          {/* Owned*/}
          <UserCard />
        </div>

        <BookingButton room={room} />
      </div>
    </div>
  );
};

export default RoomsDetailsPage;
