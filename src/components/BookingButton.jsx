"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";

const BookingButton = ({ room }) => {
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const handleBooking = async () => {
    if (!user) return;
    const bookingData = {
      userId: user.id,
      userImage: user.image,
      userName: user.name,
      roomId: room._id,
      roomName: room.roomName,
      imageUrl: room.imageUrl,
      price: room.price,
      floor: room.floor,
      updatedAt: room.updatedAt || new Date(),
    };
    // console.log(bookingData);
    const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();
    console.log(data);
  };
  // add tost
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
      {user ? (
        <button
          onClickCapture={handleBooking}
          className="w-full bg-[#6366F1] hover:bg-[#5356e2] text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-indigo-600/10 active:scale-98 transition transform duration-150 text-center"
        >
          Book Now
        </button>
      ) : (
        <button className="w-full bg-white hover:bg-gray-50 text-[#6366F1] border-2 border-indigo-100 font-bold text-sm py-4 rounded-xl active:scale-98 transition transform duration-150 text-center">
          Login to Book
        </button>
      )}
    </div>
  );
};

export default BookingButton;
