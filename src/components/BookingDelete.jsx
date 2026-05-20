"use client";
import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BookingDelete = ({ bookingId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleCancelBooking = async () => {
    try {
      const res = await fetch(`http://localhost:5000/booking/${bookingId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
      });

      if (res.ok) {
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Cancel error:", error);
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Button
        onClick={() => setIsOpen(true)}
        className="px-4 py-1.5 text-xs font-bold text-red-500 hover:text-white border border-red-200 hover:bg-red-500 rounded-xl transition duration-150 shadow-sm shadow-red-50"
      >
        Cancel
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger onClick={() => setIsOpen(false)} />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-black">
                Cancel this booking?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Are you sure you want to cancel this booking space? Your status
                will be changed to cancelled.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                onClick={() => setIsOpen(false)}
                slot="close"
                variant="tertiary"
                className="text-black"
              >
                Keep Booking
              </Button>

              <Button
                onClick={handleCancelBooking}
                slot="close"
                variant="danger"
              >
                Yes, Cancel
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default BookingDelete;
