"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sliders } from "lucide-react";

const AmenitiesFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentAmenity = searchParams.get("amenities") || "";

  const handleFilterChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("amenities", value);
    } else {
      params.delete("amenities");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl shadow-sm focus-within:border-indigo-500 transition">
      <Sliders className="w-4 h-4 text-gray-400" />
      <select
        value={currentAmenity}
        onChange={handleFilterChange}
        className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer pr-2"
      >
        <option value="">All Amenities</option>
        <option value="wifi">WiFi</option>
        <option value="powerOutlets">Power Outlets</option>
        <option value="quietZone">Quiet Zone</option>
        <option value="projector">Projector</option>
        <option value="whiteboard">Whiteboard</option>
      </select>
    </div>
  );
};

export default AmenitiesFilter;
