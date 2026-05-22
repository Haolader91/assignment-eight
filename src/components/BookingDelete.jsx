"use client";
import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const BookingDelete = ({ bookingId, token }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCancelBooking = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.ok) {
        toast.success("Booking cancelled successfully!");
        setIsOpen(false);

        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={() => setIsOpen(true)}
        className="px-4 py-1.5 text-xs font-bold hover:text-white border border-red-200 rounded-xl transition duration-150 shadow-sm shadow-red-50"
      >
        Cancel
      </Button>

      <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
                <p className="text-gray-600">
                  Are you sure you want to cancel this booking space? Your
                  status will be changed to cancelled.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="tertiary"
                  className="text-black"
                  disabled={isLoading}
                >
                  Keep Booking
                </Button>

                <Button
                  onClick={handleCancelBooking}
                  variant="danger"
                  isLoading={isLoading}
                >
                  Yes, Cancel
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </>
  );
};

export default BookingDelete;
