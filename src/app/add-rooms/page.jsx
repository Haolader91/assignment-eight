"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import React from "react";

const AddRoomsPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rooms = Object.fromEntries(formData.entries());

    const res = await fetch("http://localhost:5000/rooms", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(rooms),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="min-h-screen bg-[#fcfbfe] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl shadow-indigo-950/5 space-y-6">
        {/* Title */}
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b132a]">
            Add Room
          </h2>
        </div>

        <form className="p-2 space-y-6" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <TextField
                name="roomName"
                isRequired
                className="flex flex-col gap-1.5 text-left"
              >
                <Label className="text-sm font-bold text-[#0b132a]">
                  Room Name
                </Label>
                <Input
                  placeholder="Enter room name"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 bg-white transition text-gray-800 placeholder-gray-400"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <TextField
                name="description"
                isRequired
                className="flex flex-col gap-1.5 text-left"
              >
                <Label className="text-sm font-bold text-[#0b132a]">
                  Description
                </Label>
                <TextArea
                  placeholder="Describe your room..."
                  className="w-full px-4 py-3 rounded-3xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 bg-white transition text-gray-800 placeholder-gray-400 min-h-[120px] resize-none"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>

            {/* image url */}
            <div className="md:col-span-2">
              <TextField
                name="imageUrl"
                type="url"
                isRequired
                className="flex flex-col gap-1.5 text-left"
              >
                <Label className="text-sm font-bold text-[#0b132a]">
                  Image URL
                </Label>
                <Input
                  type="url"
                  placeholder="https://example.com/room.jpg"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 bg-white transition text-gray-800 placeholder-gray-400"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>

            {/* Floor */}
            <TextField
              name="floor"
              isRequired
              className="flex flex-col gap-1.5 text-left"
            >
              <Label className="text-sm font-bold text-[#0b132a]">Floor</Label>
              <Input
                placeholder="e.g. 3rd Floor"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 bg-white transition text-gray-800 placeholder-gray-400"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Capacity */}
            <TextField
              name="capacity"
              type="number"
              isRequired
              className="flex flex-col gap-1.5 text-left"
            >
              <Label className="text-sm font-bold text-[#0b132a]">
                Capacity
              </Label>
              <Input
                type="number"
                placeholder="Enter capacity"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 bg-white transition text-gray-800 placeholder-gray-400"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Hourly Rate (USD) */}
            <div className="md:col-span-2">
              <TextField
                name="price"
                type="number"
                isRequired
                className="flex flex-col gap-1.5 text-left"
              >
                <Label className="text-sm font-bold text-[#0b132a]">
                  Hourly Rate (USD)
                </Label>
                <Input
                  type="number"
                  placeholder="Enter hourly rate"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 bg-white transition text-gray-800 placeholder-gray-400"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>

            {/* Amenities Section */}
            <div className="md:col-span-2 space-y-3 text-left pt-2">
              <Label className="text-sm font-bold text-[#0b132a] block">
                Amenities
              </Label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-4">
                <label className="flex items-center gap-3 cursor-pointer text-gray-600 text-sm font-medium select-none">
                  <input
                    type="checkbox"
                    name="whiteboard"
                    className="w-4 h-4 rounded-md border-gray-300 accent-indigo-600"
                  />
                  <span>Whiteboard</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-gray-600 text-sm font-medium select-none">
                  <input
                    type="checkbox"
                    name="projector"
                    className="w-4 h-4 rounded-md border-gray-300 accent-indigo-600"
                  />
                  <span>Projector</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-gray-600 text-sm font-medium select-none">
                  <input
                    type="checkbox"
                    name="wifi"
                    className="w-4 h-4 rounded-md border-gray-300 accent-indigo-600"
                  />
                  <span>Wi-Fi</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-gray-600 text-sm font-medium select-none">
                  <input
                    type="checkbox"
                    name="powerOutlets"
                    className="w-4 h-4 rounded-md border-gray-300 accent-indigo-600"
                  />
                  <span>Power Outlets</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-gray-600 text-sm font-medium select-none">
                  <input
                    type="checkbox"
                    name="quietZone"
                    className="w-4 h-4 rounded-md border-gray-300 accent-indigo-600"
                  />
                  <span>Quiet Zone</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-gray-600 text-sm font-medium select-none">
                  <input
                    type="checkbox"
                    name="airConditioning"
                    className="w-4 h-4 rounded-md border-gray-300 accent-indigo-600"
                  />
                  <span>Air Conditioning</span>
                </label>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-[#6366F1] hover:bg-[#5356e2] text-white font-medium text-sm py-3.5 rounded-2xl shadow-lg shadow-indigo-600/10 active:scale-98 transition transform duration-150 text-center block"
            >
              Add Room
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomsPage;
