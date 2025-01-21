import React, { memo } from "react";
import Sidebar from "../sidebar";
import Navbar from "../navbar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 pt-[5px] pl-[5px] ">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default memo(Layout);
