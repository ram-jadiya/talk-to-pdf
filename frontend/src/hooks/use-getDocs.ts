import { DocumentService } from "@/services/docService";
import { setDocs } from "@/store/slices/docSlice";
import { Documents, GetDocumentParams } from "@/types/doc";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetDocuments = (params: GetDocumentParams) => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useQuery<Documents, Error>({
    queryKey: ["documents", params],
    queryFn: async () => {
      return await DocumentService.getDocuments(params);
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      dispatch(
        setDocs({
          documents: data,
        })
      );
    }
  }, [data, dispatch]);

  return { data, error, isLoading };
};
