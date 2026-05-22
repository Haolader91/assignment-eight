"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Label, TextArea, TextField } from "@heroui/react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const EditRoomForm = ({ initialRoom, roomId }) => {
  const router = useRouter();
  const [selectedAmenities, setSelectedAmenities] = useState(
    initialRoom?.amenities || [],
  );

  const allAmenities = [
    "Whiteboard",
    "Projector",
    "Wi‑Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedAmenities([...selectedAmenities, value]);
    } else {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== value));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedRoomData = {
      roomName: formData.get("roomName"),
      description: formData.get("description"),
      imageUrl: formData.get("imageUrl"),
      floor: formData.get("floor"),
      capacity: Number(formData.get("capacity")),
      price: Number(formData.get("price")),
      amenities: selectedAmenities,
    };

    const loadingToast = toast.loading("Updating your premium room...");

    try {
      const tokenData = await authClient.token();
      const token = tokenData?.data?.token;

      if (!token) {
        toast.dismiss(loadingToast);
        toast.error("Session expired! Please login again.");
        return;
      }

      console.log("Sending Valid Token:", token);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${roomId}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",

            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedRoomData),
        },
      );

      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success("Room updated successfully");
        router.push(`/rooms/${roomId}`);
        router.refresh();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to update room.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Server error!");
      console.error(error);
    }
  };
  console.log(onSubmit);
  return (
    <form className="p-2 space-y-6" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/*  Name */}
        <div className="md:col-span-2 text-left">
          <Input
            label="Room Name"
            name="roomName"
            placeholder="Enter room name"
            defaultValue={initialRoom?.roomName}
            className="w-full text-gray-800"
          />
        </div>

        <div className="md:col-span-2 text-left space-y-1.5">
          <label className="text-sm font-bold text-[#0b132a]">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter room description"
            required
            defaultValue={initialRoom?.description}
            className="w-full min-h-[120px] p-3 text-sm text-gray-800 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition resize-none"
          />
        </div>

        <div className="md:col-span-2 text-left">
          <Input
            label="Image URL"
            name="imageUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
            defaultValue={initialRoom?.imageUrl}
            className="w-full text-gray-800"
          />
        </div>

        <div className="text-left">
          <Input
            label="Floor"
            name="floor"
            placeholder="e.g. 3rd Floor"
            defaultValue={initialRoom?.floor}
            className="w-full text-gray-800"
          />
        </div>

        <div className="text-left">
          <Input
            label="Capacity"
            name="capacity"
            type="number"
            placeholder="e.g. 10"
            defaultValue={initialRoom?.capacity?.toString()}
            className="w-full text-gray-800"
          />
        </div>

        {/* Price */}
        <div className="md:col-span-2 text-left">
          <Input
            label="Hourly Rate (USD)"
            name="price"
            type="number"
            placeholder="e.g. 50"
            defaultValue={initialRoom?.price?.toString()}
            className="w-full text-gray-800"
          />
        </div>

        <div className="md:col-span-2 space-y-3 text-left pt-2">
          <label className="text-sm font-bold text-[#0b132a] block">
            Amenities
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-4">
            {allAmenities.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center gap-3 cursor-pointer text-gray-600 text-sm font-medium select-none"
              >
                <input
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 rounded-md border-gray-300 accent-indigo-600"
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-[#6366F1] hover:bg-[#5356e2] text-white font-medium py-6 rounded-2xl shadow-lg transition transform duration-150 text-center text-sm"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditRoomForm;
