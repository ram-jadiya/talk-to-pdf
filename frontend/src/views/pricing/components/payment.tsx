import { useMutation } from "@tanstack/react-query";
import { Button } from "../../../components/ui/button";
import { UpgradeIcon } from "../../../components/ui/icons";
import { PaymentService } from "../../../services/paymentService";
import { useToast } from "../../../hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/authSlice";

type Props = {
  planId: number;
  price: number;
};

const Payment = ({ planId, price }: Props) => {
  const { toast } = useToast();
  const user = useSelector(selectUser);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await PaymentService.createPaymetnSession(planId);
    },
    onError: (error) => {
      toast({
        description:
          error.message ?? "Something went wrong, Please try again later.",
        variant: "danger",
      });
    },
    onSuccess: ({ sessionUrl }) => {
      window.location.href = sessionUrl;
    },
  });

  const onUpgrade = () => {
    mutate();
  };

  return (
    <Button
      type="submit"
      disabled={price == 0 || isPending || user?.isPremium}
      className="px-[53px] py-[13px]"
      onClick={onUpgrade}
    >
      {isPending ? (
        <Loader2 className="w-5 h-5" />
      ) : (
        <UpgradeIcon className="w-5 h-5" />
      )}
      UPGRADE PRO
    </Button>
  );
};

export default Payment;
