import axiosInstance from "./axios";
import {
  Chats,
  Document,
  Documents,
  GetChatParams,
  GetDocumentParams,
} from "@/types/doc";

export class DocumentService {
  public static createDocument = async (file: File): Promise<Document> => {
    const formData = new FormData();
    formData.append("pdf", file);

    const res = await axiosInstance.post("/document/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.data as Document;
  };

  public static getDocuments = async (
    params: GetDocumentParams
  ): Promise<Documents> => {
    const res = await axiosInstance.get("/document", {
      params,
    });

    return res.data.data as Documents;
  };

  public static renameDoc = async (
    id: number,
    title: string
  ): Promise<Document> => {
    const res = await axiosInstance.patch(`/document/${id}/rename`, {
      title,
    });

    return res.data.data as Document;
  };

  public static deleteDoc = async (id: number): Promise<null> => {
    await axiosInstance.delete(`/document/${id}`);
    return null;
  };

  public static getChats = async (params: GetChatParams): Promise<Chats> => {
    const res = await axiosInstance.get("/query", {
      params,
    });

    return res.data.data as Chats;
  };

  public static createChats = async (
    body: {
      query: string;
      docId: number;
    },
    callback: Function
  ) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/query", body, {
          responseType: "stream",
          onDownloadProgress: (progressEvent) => {
            const response = progressEvent.event?.target?.response;
            if (response && typeof response === "string") {
              callback(response);

              // Check if this is the last chunk
              if (progressEvent.loaded === progressEvent.total) {
                resolve(response);
              }
            }
          },
        })
        .catch(reject);
    });
  };
}
