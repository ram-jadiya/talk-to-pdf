import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { cn } from "../../../lib/utils";

type Props = {
  onOtpSentChange: (isOtpSent: boolean) => void;
  onEmailSubmit: (email: string) => void;
};

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

const SignInForm = ({ onEmailSubmit, onOtpSentChange }: Props) => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (email: string) => await AuthService.signIn(email),
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
    mutation.mutate(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-[40px]">
        <Input
          className={cn("w-full", { "border border-red-500": errors.email })}
          placeholder="Enter your Email"
          {...register("email")}
        />
      </div>
      <div className="pt-10">
        <Button disabled={mutation.isPending} type="submit" className="w-full">
          {mutation.isPending && <Loader2 className="animate-spin" />}
          SIGN IN
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
