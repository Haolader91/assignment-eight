"use client";

import RoomsCard from "@/components/RoomsCard";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const MyListingsPage = () => {
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRooms = async () => {
      try {
        const tokenData = await authClient.token();
        const token = tokenData?.data?.token;

        // console.log(token);

        if (!token) {
          toast.error("Please login to view your listings!");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-rooms`,
          {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.ok) {
          const data = await res.json();
          setRoomsData(data);
        } else {
          toast.error("Failed to load your personal listings.");
        }
      } catch (error) {
        console.error("Error loading listings:", error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRooms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbfe]">
        <p className="text-indigo-600 font-semibold animate-pulse">
          Loading your premium listings...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfbfe] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold text-black py-5 capitalize">
            My Added Rooms ({roomsData.length})
          </h2>
        </div>

        {roomsData.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">
              You have not added any rooms yet!
            </p>
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

export default MyListingsPage;
