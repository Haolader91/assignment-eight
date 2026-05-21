import React from "react";
// import EditRoomForm from "@/components/EditRoomForm";

const EditRoomPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/rooms/${id}`, {
    cache: "no-store",
  });
  const room = await res.json();

  if (!room) {
    return <div className="p-10 text-center font-bold">Room not found!</div>;
  }

  return (
    <div className="min-h-screen bg-[#fcfbfe] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b132a] text-left">
          Update Room Info
        </h2>

        {/* <EditRoomForm initialRoom={room} roomId={id} /> */}
      </div>
    </div>
  );
};

export default EditRoomPage;
