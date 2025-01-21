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
import { Input } from "./input";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/className";
import { Button } from "./button";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { DocumentService } from "@/services/docService";
import { useDispatch } from "react-redux";
import { renameDoc } from "@/store/slices/docSlice";
import { Loader2 } from "lucide-react";

type Props = {
  children: React.ReactNode; // Trigger component
  title: string;
  id: number;
};

const schema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
});

type FormData = z.infer<typeof schema>;

export const RenameModal = ({ children, id, title }: Props) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async ({ id, title }: { id: number; title: string }) =>
      await DocumentService.renameDoc(id, title),
    onSuccess: (data) => {
      dispatch(
        renameDoc({
          id: data.id,
          title: data.title,
        })
      );
      closeModal();
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

  const onSubmit = (data: FormData) => {
    mutation.mutate({ id, title: data.title });
  };

  return (
    <AlertDialog open={isModalOpen}>
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
          <AlertDialogTitle className="text-2xl leading-[34px] text-white ">
          Rename the document for clarity.
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Input
                  className={cn("w-full rounded-lg", {
                    "border border-red-500": errors.title,
                  })}
                  placeholder="Rename this file"
                  {...register("title")}
                  defaultValue={title}
                />
              </div>
              <AlertDialogFooter className="pt-5">
                <Button className="h-11" disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Rename"
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
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
