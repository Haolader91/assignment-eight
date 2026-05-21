import { Heart, Monitor, ShieldAlert, Sliders, Wifi } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RoomsCard = ({ room }) => {
  const maxAmenities = 3;
  let cleanAmenities = [];
  if (
    room.amenities &&
    typeof room.amenities === "object" &&
    !Array.isArray(room.amenities)
  ) {
    cleanAmenities = Object.keys(room.amenities).filter(
      (key) => room.amenities[key] === true,
    );
  } else if (Array.isArray(room.amenities)) {
    cleanAmenities = room.amenities;
  }
  const displayedAmenities = cleanAmenities.slice(0, maxAmenities);
  const remainingCount = cleanAmenities.length - maxAmenities;

  return (
    <div>
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl hover:shadow-indigo-950/5 transition duration-300 flex flex-col group">
        {/* Image */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
          <Image
            src={room.imageUrl}
            alt={room.roomName}
            fill
            sizes="(max-w-7xl) 100vw, (max-w-1200px) 50vw, 33vw"
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
            <span className="flex items-center gap-1">{room.floor}</span>
            <span>•</span>
            <span className="flex items-center gap-1">{room.capacity}</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {room.description}
          </p>

          <div className="pt-1">
            <span className="text-lg font-bold text-[#6366F1]">
              ${room.price}/hr
            </span>
          </div>

          {/*  Amenities */}
          <div className="pt-2 flex flex-wrap gap-1.5 items-center grow">
            {displayedAmenities.map((amenity, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-semibold rounded-lg"
              >
                {amenity}
              </span>
            ))}

            {remainingCount > 0 && (
              <span className="text-xs font-bold text-gray-400 pl-1">
                +{remainingCount} more
              </span>
            )}
          </div>
          <div className="pt-4 border-t border-gray-50">
            <Link href={`/rooms/${room._id}`}>
              <button className="w-full text-center bg-white text-indigo-600 border border-indigo-100 hover:bg-indigo-50 font-bold py-2.5 px-4 rounded-xl transition duration-150 text-sm">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsCard;
