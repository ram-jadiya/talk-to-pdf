import React from "react";
import { CrossMarkIcon, RighMarkIcon } from "../../components/ui/icons";
import { PaymentService } from "../../services/paymentService";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Payment from "./components/payment";

const Pricing: React.FC = () => {
  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      return await PaymentService.getPlans();
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });

  return (
    <div className="">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-10 h-10" />
        </div>
      ) : (
        <>
          {/* header section */}
          <div className="text-center pt-[85px] pb-[82px]">
            <div className="text-5xl font-semibold leading-[58px] pb-[10px]">
              Pricing
            </div>
          </div>

          {/* pricing section */}
            <div className="flex justify-center gap-[30px]">
              {plans.map((it) => {
                return (
                  <div className="rounded-[20px] bg-black" key={it.id}>
                    <div className="p-10 space-y-[10px]">
                      <div className="text-2xl leading-[34px]">{it.title}</div>
                      <div className="leading-[26px] text-grey">{it.desc}</div>
                      <div className="font-semibold text-5xl leading-[58px] text-primary">
                        ${it.price}
                      </div>
                      <div className="pb-[30px] leading-[26px]">
                        {it.validityDesc}
                      </div>

                      <div className="space-y-[10px]">
                        {it.features.map((feature, idx) => {
                          return (
                            <div
                              className="flex items-center gap-[10px]"
                              key={idx}
                            >
                              <div className="text-primary py-1">
                                {feature.isAvailable ? (
                                  <RighMarkIcon className="h-4 w-4" />
                                ) : (
                                  <CrossMarkIcon className="h-4 w-4" />
                                )}
                              </div>
                              <div className="text-sm leading-6">
                                {feature.title}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-[53px]">
                        <Payment planId={it.id} price={it.price} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
        </>
      )}
    </div>
  );
};

export default Pricing;
