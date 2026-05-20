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

const AllRoomsPage = async () => {
  const res = await fetch("http://localhost:5000/rooms");
  const roomsData = await res.json();

  return (
    <div className="bg-[#fcfbfe] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {roomsData.map((room) => (
            <RoomsCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRoomsPage;
