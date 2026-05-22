"use client";
import { authClient } from "@/lib/auth-client";
import { Modal, Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock } from "lucide-react";
import toast from "react-hot-toast";

const BookingButton = ({ room, token }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [date, setDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (startHour && endHour) {
      const duration = Number(endHour) - Number(startHour);
      if (duration > 0) {
        setTotalCost(duration * room.price);
        setErrorMsg("");
      } else {
        setTotalCost(0);
        setErrorMsg("End time must be after start time!");
      }
    }
  }, [startHour, endHour, room.price]);

  const handleBookingSubmit = async () => {
    if (!date) {
      setErrorMsg("Please select a date!");
      return;
    }
    if (!startHour || !endHour) {
      setErrorMsg("Please select both start and end time!");
      return;
    }
    if (Number(endHour) <= Number(startHour)) {
      setErrorMsg("Minimum booking is 1 hour!");
      return;
    }

    const bookingData = {
      userId: user?.id,
      userEmail: user?.email,
      userImage: user?.image,
      userName: user?.name,
      roomId: room._id,
      roomName: room.roomName,
      imageUrl: room.imageUrl,
      price: room.price,
      floor: room.floor,
      date,
      startHour: Number(startHour),
      endHour: Number(endHour),
      totalCost,
      specialNote,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Room booked successfully!");

        setDate("");
        setStartHour("");
        setEndHour("");
        setSpecialNote("");
        setErrorMsg("");

        document.getElementById("close-modal-btn")?.click();

        router.refresh();
        router.push("/my-bookings");
      } else {
        setErrorMsg(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to connect to the server.");
    }
  };

  return (
    <div className="w-full pt-6 border-t border-gray-100">
      {user ? (
        <Modal>
          <Button className="w-full bg-[#6366F1] hover:bg-[#5356e2] text-white font-bold text-sm py-6 rounded-xl shadow-lg active:scale-98 transition transform duration-150 text-center">
            Book Now
          </Button>

          <Modal.Backdrop>
            <Modal.Container placement="auto">
              <Modal.Dialog className="sm:max-w-md bg-white text-black rounded-2xl p-6 relative">
                <Modal.CloseTrigger className="text-gray-400 hover:text-black absolute top-4 right-4" />

                <Modal.Header className="flex flex-col gap-1 items-start">
                  <div className="bg-indigo-50 text-[#6366F1] p-2.5 rounded-xl mb-2">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <Modal.Heading className="text-xl font-bold text-gray-900">
                    Book Room: {room.roomName}
                  </Modal.Heading>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Choose your preferred date and continuous hourly slots.
                    Minimum booking is 1 hour.
                  </p>
                </Modal.Header>

                <Modal.Body className="py-4">
                  <div className="flex flex-col gap-4">
                    {/* Date Picker */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-600预算">
                        Select Date
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        required
                        className="w-full border border-gray-200 p-2.5 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600">
                          Start Time
                        </label>
                        <select
                          className="w-full border border-gray-200 p-2.5 rounded-xl bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={startHour}
                          onChange={(e) => setStartHour(e.target.value)}
                        >
                          <option value="">Select</option>
                          {[...Array(13)].map((_, i) => {
                            const hour = i + 8; // 08:00 to 20:00
                            return (
                              <option key={hour} value={hour}>
                                {hour < 10 ? `0${hour}` : hour}:00
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-600">
                          End Time
                        </label>
                        <select
                          className="w-full border border-gray-200 p-2.5 rounded-xl bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={endHour}
                          onChange={(e) => setEndHour(e.target.value)}
                        >
                          <option value="">Select</option>
                          {[...Array(13)].map((_, i) => {
                            const hour = i + 8; // 08:00 to 20:00
                            return (
                              <option key={hour} value={hour}>
                                {hour < 10 ? `0${hour}` : hour}:00
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-600">
                        Special Note (Optional)
                      </label>
                      <textarea
                        className="w-full border border-gray-200 p-2.5 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm h-20 resize-none"
                        placeholder="Add any special instructions..."
                        value={specialNote}
                        onChange={(e) => setSpecialNote(e.target.value)}
                      />
                    </div>

                    <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex justify-between items-center mt-1">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Clock className="w-4 h-4 text-[#6366F1]" />
                        <span>Total Cost:</span>
                      </div>
                      <span className="text-lg font-black text-[#6366F1]">
                        ${totalCost}
                      </span>
                    </div>

                    {errorMsg && (
                      <p className="text-xs font-bold text-red-500 bg-red-50 p-2.5 rounded-xl border border-red-100">
                        {errorMsg}
                      </p>
                    )}
                  </div>
                </Modal.Body>

                <Modal.Footer className="border-t pt-4 flex justify-end gap-2">
                  <Button
                    id="close-modal-btn"
                    slot="close"
                    className="border border-gray-200 text-gray-700 font-medium rounded-xl text-sm px-4 bg-transparent hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBookingSubmit}
                    className="bg-[#6366F1] hover:bg-[#5356e2] text-white font-bold rounded-xl text-sm px-5"
                  >
                    Confirm Booking
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ) : (
        <button className="w-full bg-white hover:bg-gray-50 text-[#6366F1] border-2 border-indigo-100 font-bold text-sm py-4 rounded-xl active:scale-98 transition transform duration-150 text-center">
          Login to Book
        </button>
      )}
    </div>
  );
};

export default BookingButton;
