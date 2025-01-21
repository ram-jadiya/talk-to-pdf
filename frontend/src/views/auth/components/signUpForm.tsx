import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SignUpBody } from "../../../types/auth";
import { AuthService } from "../../../services/authService";
import { Input } from "../../../components/ui/input";
import { cn } from "../../../utils/className";
import { Button } from "../../../components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type Props = {
  onOtpSentChange: (isOtpSent: boolean) => void;
  onEmailSubmit: (email: string) => void;
};

const schema = z.object({
  fName: z.string().min(1, "First Name is required"),
  lName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

const SignUpForm = ({ onOtpSentChange, onEmailSubmit }: Props) => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (signUpBody: SignUpBody) =>
      await AuthService.signUp(signUpBody),
    onSuccess: (data) => {
      onEmailSubmit(data.email);
      onOtpSentChange(true);
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

  const onSubmit = (data: FormData) => {
    const signUpBody: SignUpBody = {
      fName: data.fName,
      lName: data.lName,
      email: data.email,
    };
    mutation.mutate(signUpBody);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-[40px]">
        <Input
          className={cn("w-full", { "border border-red-500": errors.fName })}
          placeholder="First Name"
          {...register("fName")}
        />
      </div>
      <div className="pt-[18px]">
        <Input
          className={cn("w-full", { "border border-red-500": errors.fName })}
          placeholder="Last Name"
          {...register("lName")}
        />
      </div>
      <div className="pt-[18px]">
        <Input
          className={cn("w-full", { "border border-red-500": errors.fName })}
          placeholder="Email"
          {...register("email")}
        />
      </div>
      <div className="pt-10">
        <Button disabled={mutation.isPending} type="submit" className="w-full">
          {mutation.isPending && <Loader2 className="animate-spin" />}
          SIGN UP
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
