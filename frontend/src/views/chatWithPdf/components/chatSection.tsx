import DocumentAction from "./docAction";
import { ChatContainer } from "./chatContainer";
import { ChatInput } from "./chatInput";
import { Chats, Document } from "@/types/doc";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DocumentService } from "@/services/docService";
import { useToast } from "@/hooks/use-toast";

type Props = {
  doc: Document;
};

const ChatSection = ({ doc }: Props) => {
  const [chats, setChats] = useState<Chats>([]);
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const { data } = useQuery<Chats, Error>({
    queryKey: ["chats", doc.id],
    queryFn: async () => {
      return await DocumentService.getChats({
        docId: doc.id,
        skip: chats.length,
        limit: 20,
      });
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: async ({ query }: { query: string }) => {
      DocumentService.createChats(
        {
          docId: doc.id,
          query,
        },
        (res: string) => {
          chats[chats.length - 1].response = res;
          setChats([...chats]);
        }
      );
    },
    onError: (error) => {
      toast({
        description:
          error.message ?? "Something went wrong, Please try again later.",
        variant: "danger",
      });
    },
  });

  useEffect(() => {
    if (data) {
      setChats([...data.reverse()]);
    }
  }, [data]);

  const onSubmit = () => {
    if (query.trim() != "") {
      chats.push({ query, response: "", id: chats.length + 1 });
      setChats([...chats]);
      mutation.mutate({ query });
      setQuery("");
    }
  };

  return (
    <div className="w-[50%] p-5  bg-white/10">
      <DocumentAction doc={doc} />
      <div className="flex flex-col justify-between h-[calc(100vh-202px)] gap-5">
        <ChatContainer chats={chats} />
        <ChatInput query={query} onSubmit={onSubmit} setQuery={setQuery} />
      </div>
    </div>
  );
};

export default ChatSection;
