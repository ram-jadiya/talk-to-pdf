import { AuthType } from "@/constants/enum";
import { useToast } from "@/hooks/use-toast";
import { AuthService } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

type Props = {
  authType: AuthType;
  email: string;
};

const ResendCode = ({ authType, email }: Props) => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      if (authType === AuthType.SIGN_IN) {
        return await AuthService.signIn(email);
      } else {
        return await AuthService.resendSignUpOTP(email);
      }
    },
    onSuccess: () => {
      toast({
        description: "Your OTP has been sent.",
      });
    },
    onError: (error) => {
      toast({
        description:
          error.message ?? "Something went wrong, Please try again later.",
        variant: "danger",
      });
    },
  });

  const onSubmit = () => {
    mutation.mutate(email);
  };

  return (
    <div onClick={onSubmit}>
      {mutation.isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        "RESENDING CODE"
      )}
    </div>
  );
};

export default ResendCode;
