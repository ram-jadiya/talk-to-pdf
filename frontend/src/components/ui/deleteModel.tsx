"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { DocumentService } from "@/services/docService";
import { Button } from "./button";
import { removeDoc } from "@/store/slices/docSlice";
import { Loader2 } from "lucide-react";

type Props = {
  children: React.ReactNode; // Trigger component
  docId: number;
};

export const DeletePdf = ({ children, docId }: Props) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

  const mutation = useMutation({
    mutationFn: async () => await DocumentService.deleteDoc(docId),
    onSuccess: () => {
      dispatch(
        removeDoc({
          id: docId,
        })
      );
      closeModal();
      window.location.href = "/";
    },
    onError: (error) => {
      toast({
        description:
          error.message ?? "Something went wrong, Please try again later.",
        variant: "danger",
      });
    },
  });

  // Open and close modal methods
  const openModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <AlertDialog open={isModalOpen}>
      {/* Wrap children in a singlFe element */}
      <AlertDialogTrigger>
        <div onClick={openModal}>{children}</div> {/* Open modal on click */}
      </AlertDialogTrigger>

      {/* Modal content */}
      <AlertDialogContent
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter" || e.key === "Escape") {
            e.stopPropagation(); // Prevent closing on space/enter/escape key
          }
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl leading-[34px] text-white">
            Are you sure you want to delete this PDF?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            disabled={mutation.isPending}
            className="h-11"
            onClick={handleDelete}
          >
            {mutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            type="button"
            onClick={closeModal}
            className="bg-white/10 h-11"
          >
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
