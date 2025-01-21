import { useState } from "react";
import { AuthType } from "../../constants/enum";
import VerifyOtp from "./components/verifyOtp";
import { cn } from "../../utils/className";
import { motion } from "framer-motion";
import SignInForm from "./components/signInForm";
import SignUpForm from "./components/signUpForm";
import GoogleLogin from "./components/googleLogin";

const Auth = () => {
  const [authType, setAuthType] = useState<AuthType>(AuthType.SIGN_IN);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  return (
    <>
      {isOtpSent ? (
        <VerifyOtp
          authType={authType}
          email={submittedEmail}
          onVerifyOtp={setIsOtpSent}
        />
      ) : (
        <div className="px-[90px]">
          <div className="flex justify-between text-xl font-medium leading-[34px]">
            <div
              className={cn("cursor-pointer relative")}
              onClick={() => setAuthType(AuthType.SIGN_IN)}
            >
              <span>SIGN IN</span>
              {authType === AuthType.SIGN_IN && (
                <motion.div
                  className="absolute bottom-0 h-0.5 w-full left-0 right-0 bg-[#E88E27]"
                  layoutId="auth-card-animation"
                />
              )}
            </div>
            <div
              className={cn("cursor-pointer relative")}
              onClick={() => setAuthType(AuthType.SIGN_UP)}
            >
              <span>SIGN UP</span>
              {authType === AuthType.SIGN_UP && (
                <motion.div
                  className="absolute bottom-0 h-0.5 w-full left-0 right-0 bg-[#E88E27]"
                  layoutId="auth-card-animation"
                />
              )}
            </div>
          </div>

          {authType == AuthType.SIGN_IN ? (
            <SignInForm
              onOtpSentChange={setIsOtpSent}
              onEmailSubmit={setSubmittedEmail}
            />
          ) : (
            <SignUpForm
              onOtpSentChange={setIsOtpSent}
              onEmailSubmit={setSubmittedEmail}
            />
          )}

          <div className="flex items-center pt-10">
            <div className="flex-grow border-t border-dashed border-[#7B7874]" />
            <div className="px-4 text-sm text-[#7B7874]">{"OR"}</div>
            <div className="flex-grow border-t border-dashed border-[#7B7874]" />
          </div>
          <div className="pt-10">
            <GoogleLogin />
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
