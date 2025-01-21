"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { useDispatch } from "react-redux";
import { clearAuthData } from "@/store/slices/authSlice";

type Props = {
  children: React.ReactNode; // Trigger component
};

export const LogOutModal = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const dispatch = useDispatch();

  // Open and close modal methods
  const openModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    dispatch(clearAuthData());
    closeModal(); // Close modal after delete
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      {/* Wrap children in a single element */}
      <AlertDialogTrigger>
        <div onClick={openModal} className="">{children}</div> {/* Open modal on click */}
      </AlertDialogTrigger>

      {/* Modal content */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl leading-[34px] text-white">
            Are you sure you want to log out?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
