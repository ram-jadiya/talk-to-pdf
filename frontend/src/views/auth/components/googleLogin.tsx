import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../components/ui/button";
import { GoogleIcon } from "../../../components/ui/icons";
import { AuthService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { setAuthData } from "@/store/slices/authSlice";
import { GoogleLogin as Google, CredentialResponse } from "@react-oauth/google";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const googleLoginRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation({
    mutationFn: async (idToken: string) => {
      return await AuthService.googleLogin(idToken);
    },
    onSuccess: (data) => {
      dispatch(setAuthData(data));
      toast({
        description: "Logged in successfully.",
      });
    },
    onError: (error) => {
      toast({
        description: error?.message ?? "Google login failed, please try again.",
        variant: "danger",
      });
    },
  });

  const handleGoogleLogin = () => {
    const googleLoginButton = googleLoginRef.current?.querySelector(
      'div[role="button"]'
    ) as HTMLElement;   
    googleLoginButton?.click();
  };

  return (
    <>
      <Button
        className="w-full text-base font-normal leading-[26px]"
        variant="ghost"
        onClick={handleGoogleLogin}
      >
        <GoogleIcon /> Continue with Google
      </Button>

      <div ref={googleLoginRef} className="hidden">
        <Google
          type="standard"
          theme="filled_black"
          size="large"
          onSuccess={(credentialResponse: CredentialResponse) => {
            if (credentialResponse.credential) {
              mutation.mutate(credentialResponse.credential);
            }
          }}
          onError={() => {
            toast({
              description: "Google login failed, please try again.",
              variant: "danger",
            });
          }}
        />
      </div>
    </>
  );
};

export default GoogleLogin;
