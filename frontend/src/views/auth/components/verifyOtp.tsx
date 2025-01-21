import { AuthType } from "@/constants/enum";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { cn } from "../../../utils/className";
import GoogleLogin from "../components/googleLogin";
import ResendCode from "./resendCode";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/authService";
import { VerifyOtpBody, VerifySignInResponse } from "@/types/auth";
import { useDispatch } from "react-redux";
import { setAuthData } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { formatEmail } from "@/lib/utils";

type Props = {
  authType: AuthType;
  email: string;
  onVerifyOtp: (isVerifyOTP: boolean) => void;
};

const schema = z.object({
  code: z.string().length(6, "OTP must be 6 digits"),
});

type FormData = z.infer<typeof schema>;

export default function VerifyOtp({ authType, email, onVerifyOtp }: Props) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (body: VerifyOtpBody) => {
      if (authType === AuthType.SIGN_UP) {
        return await AuthService.verifySignUpOtp(body);
      }
      return await AuthService.verifySignInOtp(body);
    },
    onSuccess: (data) => {
      if (authType === AuthType.SIGN_UP) {
        onVerifyOtp(false);
        toast({
          description: "OTP verified successfully.",
        });
      }

      if (authType === AuthType.SIGN_IN) {
        dispatch(setAuthData(data as VerifySignInResponse));
        toast({
          description: "Logged in successfully.",
        });
      }

      navigate("/");
    },
    onError: (error) => {
      toast({
        description: error.message ?? "Invalid OTP, please try again.",
        variant: "danger",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    const body: VerifyOtpBody = {
      email,
      code: data.code,
    };
    mutation.mutate(body);
  };

  return (
    <div className="px-[90px]">
      <div className={cn("text-xl font-medium leading-[30px] text-center")}>
        You&apos;re so close—take a look at your inbox!
      </div>
      <div className="text-grey text-center leading-[26px]">
        Enter the code we just send to {formatEmail(email)}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pt-10">
          <Input
            className={cn("w-full", { "border border-red-500": errors.code })}
            placeholder="Enter OTP"
            {...register("code")}
          />
        </div>
        <div className="pt-5">
          <Button className="w-full" variant={"default"} type="submit">
            Verify
          </Button>
        </div>
      </form>
      <div className="leading-[26px] pt-5 cursor-pointer">
        <ResendCode authType={authType} email={email} />
      </div>
      <div className="flex items-center pt-10">
        <div className="flex-grow border-t border-dashed border-grey" />
        <div className="px-4 text-sm text-grey">{"OR"}</div>
        <div className="flex-grow border-t border-dashed border-grey" />
      </div>
      <div className="pt-10">
        <GoogleLogin />
      </div>
    </div>
  );
}
