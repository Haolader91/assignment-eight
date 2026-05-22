import { CalendarDays, XCircle } from "lucide-react";
import Image from "next/image";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookingDelete from "@/components/BookingDelete";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    return (
      <div className="py-12 text-center font-bold">
        Please login to view your bookings.
      </div>
    );
  }

  const res = await fetch(`http://localhost:5000/booking/${user?.id}`, {
    cache: "no-store",
  });
  const bookings = await res.json();

  return (
    <div className="bg-[#fcfbfe] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-[#0b132a] mb-6 tracking-tight">
          My Bookings
        </h1>

        {bookings.length > 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Booking</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {bookings.map((booking) => {
                    const currentStatus = booking.status || "Confirmed";

                    return (
                      <tr
                        key={booking._id}
                        className="hover:bg-gray-50/30 transition"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 relative rounded-xl overflow-hidden border border-gray-100 shrink-0">
                              <Image
                                src={booking.imageUrl}
                                alt={booking.roomName}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800">
                                {booking.roomName}
                              </h3>
                              <p className="text-xs text-gray-400 font-medium">
                                {booking.floor}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-700">
                            {booking.date
                              ? new Date(booking.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )
                              : "N/A"}
                          </p>
                          <p className="text-xs text-indigo-600 font-bold mt-0.5">
                            {booking.startHour !== undefined &&
                            booking.endHour !== undefined
                              ? `${booking.startHour < 10 ? `0${booking.startHour}` : booking.startHour}:00 - ${booking.endHour < 10 ? `0${booking.endHour}` : booking.endHour}:00`
                              : "N/A"}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                              currentStatus === "Cancelled"
                                ? "bg-red-50 text-red-600 border border-red-100"
                                : "bg-green-50 text-green-600 border border-green-100"
                            }`}
                          >
                            {currentStatus}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-bold text-gray-800">
                          ${booking.totalCost || booking.price}
                        </td>

                        <td className="px-6 py-4 text-center">
                          {currentStatus !== "Cancelled" ? (
                            <BookingDelete bookingId={booking._id} />
                          ) : (
                            <span className="text-gray-400 font-bold">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-[#fcfdff] border border-dashed border-gray-200 rounded-2xl py-16 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 bg-indigo-50/50 rounded-2xl flex items-center justify-center text-indigo-500 mb-4 border border-indigo-50/80 shadow-inner">
              <CalendarDays className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 tracking-tight">
              You have no bookings yet.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
