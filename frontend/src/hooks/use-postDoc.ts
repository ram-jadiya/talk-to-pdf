import { DocumentService } from "@/services/docService";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addDoc } from "@/store/slices/docSlice";
import { Document } from "../types/doc";
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";

export const usePostDocument = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation<Document, Error, File>({
    mutationFn: async (file: File) => {
      return await DocumentService.createDocument(file);
    },
    onSuccess: (data) => {
      dispatch(
        addDoc({
          document: data,
        })
      );
      navigate("/chatWithPdf/" + data.id);
    },
    onError: (error) => {
      toast({
        description:
          error.message ?? "Something went wrong, Please try again later.",
        variant: "danger",
      });
    },
  });

  return mutation;
};
