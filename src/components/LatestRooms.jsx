import RoomsCard from "@/components/RoomsCard";
import Link from "next/link";
import { BiRightArrow } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";

const LatestRooms = async () => {
  const res = await fetch("http://localhost:5000/available");
  const roomsData = await res.json();

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0b132a] tracking-tight">
            Latest Available Rooms
          </h2>

          <Link
            href="/rooms"
            className="text-xs sm:text-sm flex gap-2 items-center font-bold text-[#6366f1] hover:text-[#4f46e5] transition duration-150"
          >
            View All <FaArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {roomsData.map((room) => (
            <RoomsCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestRooms;
