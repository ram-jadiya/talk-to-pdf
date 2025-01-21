import React from "react";

interface ChatMessageProps {
  query: string;
  response: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  query,
  response,
}) => {
  return (
    <div>
      <div className="pt-5 flex justify-end">
        <div className="leading-[26px] bg-[#E88E270F] px-5 py-[10px] max-w-[500px] border border-primary rounded-[20px]">
          {query}
        </div>
      </div>
      <div className="pt-5">
        <div
          className="leading-[26px] bg-white/5 px-5 py-[10px] max-w-[500px] rounded-[20px]"
          dangerouslySetInnerHTML={{
            __html: response.replace(/\n/g, "<br />"),
          }}
        />
      </div>
    </div>
  );
};
