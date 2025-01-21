import React from "react";
import * as Spinner from "@radix-ui/react-progress";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner.Root className="animate-spin">
        <Spinner.Indicator className="block w-8 h-8 border-4 border-t-transparent border-solid rounded-full border-gray-500" />
      </Spinner.Root>
    </div>
  );
};

export default Loading;
