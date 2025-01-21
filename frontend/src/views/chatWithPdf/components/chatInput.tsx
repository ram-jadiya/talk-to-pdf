import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EnterIcon } from "@/components/ui/icons";

interface ChatInputProps {
  query: string;
  setQuery: (query: string) => void;
  onSubmit: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  query,
  setQuery,
  onSubmit,
}) => {
  return (
    <div className="flex gap-5">
      <Input
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask your question... "
        className="w-full bg-black h-[50px]"
      />
      <Button className="h-[50px]" onClick={onSubmit}>
        <EnterIcon />
      </Button>
    </div>
  );
};
