import React from "react";
import UploadDoc from "./components/uploadDoc";

const Dashboard: React.FC = () => {
  return (
    <div className="pt-[100px] px-[187px]">
      <div className="pb-[67px]">
        <div className="font-semibold text-5xl leading-[58px] text-center">
          Talk To any PDF
        </div>
      </div>

      {/* Drag-and-Drop Area */}
      <UploadDoc />
    </div>
  );
};

export default Dashboard;
