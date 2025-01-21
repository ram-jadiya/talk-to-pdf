import { Plans } from "../types/payment";
import axiosInstance from "./axios";

export class PaymentService {
  public static getPlans = async (): Promise<Plans> => {
    const res = await axiosInstance.get("/payment/plan");

    return res.data.data as Plans;
  };

  public static createPaymetnSession = async (
    planId: number
  ): Promise<{
    sessionUrl: string;
  }> => {
    const res = await axiosInstance.get("/payment/create-checkout-session", {
      params: {
        planId,
      },
    });

    return res.data.data;
  };
}
