"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertDialog, Button } from "@heroui/react";

const DeleteRoomButton = ({ roomId, token }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const loadingToast = toast.loading("Deleting room...");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${roomId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success("Room deleted successfully");
        router.push("/rooms");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete room");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <Button variant="danger">Delete Room</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-red-800">
                Delete room permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Permanently
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteRoomButton;
