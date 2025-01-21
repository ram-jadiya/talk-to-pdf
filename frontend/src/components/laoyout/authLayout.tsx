import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-authImg min-h-screen w-full bg-cover flex items-center justify-center">
      <div className="text-white  min-h-[744px] max-w-[500px] w-full bg-black rounded-[20px] border-[1px] border-[#E88E274D]">
        <div className="text-[32px] font-medium leading-[42px] px-[90px] py-[60px] text-center">
          TalkToPDF
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
