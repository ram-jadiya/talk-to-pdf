import {
  SignInResponse,
  SignUpBody,
  SignUpResponse,
  User,
  VerifyOtpBody,
  VerifySignInResponse,
} from "@/types/auth";
import axiosInstance from "./axios";

export class AuthService {
  public static signUp = async (
    signUpBody: SignUpBody
  ): Promise<SignUpResponse> => {
    const res = await axiosInstance.post("/auth/signUp", signUpBody);

    return res.data.data as SignUpResponse;
  };

  public static resendSignUpOTP = async (email: string): Promise<User> => {
    const res = await axiosInstance.post("/auth/otp/signUp", {
      email,
    });

    return res.data.data as User;
  };

  public static signIn = async (email: string): Promise<SignUpResponse> => {
    const res = await axiosInstance.post("/auth/otp/logIn", {
      email,
    });

    return res.data.data as SignInResponse;
  };

  public static verifySignUpOtp = async (
    verifyOtpBody: VerifyOtpBody
  ): Promise<SignUpResponse> => {
    const res = await axiosInstance.post(
      "/auth/signUp/verify-otp",
      verifyOtpBody
    );

    return res.data.data as SignInResponse;
  };

  public static verifySignInOtp = async (
    verifyOtpBody: VerifyOtpBody
  ): Promise<VerifySignInResponse> => {
    const res = await axiosInstance.post(
      "/auth/logIn/verify-otp",
      verifyOtpBody
    );

    return res.data.data as VerifySignInResponse;
  };

  public static googleLogin = async (
    token: string
  ): Promise<VerifySignInResponse> => {
    const res = await axiosInstance.post("/auth/google", {
      token,
    });

    return res.data.data as VerifySignInResponse;
  };

  public static verifyAccessToken = async (): Promise<User> => {
    const res = await axiosInstance.get("/auth/access-token/verify");

    return res.data.data as User;
  };
}
