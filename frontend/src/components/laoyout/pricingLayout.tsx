import React from "react";

const PricingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="bg-authImg h-screen w-full bg-cover">{children}</div>;
};

export default PricingLayout;
