"use client";
import { Inputs } from "../../types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useContext } from "react";
import { AuthenticationContext } from "@/app/context/AuthContext";

const useAuth = () => {
  const router = useRouter();
  const { setAuthState } = useContext(AuthenticationContext);

  //sign-up functionality
  const signUp = async ({
    firstName,
    lastName,
    email,
    password,
    phone,
    role,
  }: Inputs) => {
    try {
      let response = await axios.post(
        "http://localhost:6969/api/v1/auth/register",
        { firstName, lastName, email, password, phone, role },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        router.push("/auth/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //sign-in functionality
  const logIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setAuthState({
      loading: true,
      error: null,
    });
    try {
      let response = await axios.post(
        "http://localhost:6969/api/v1/auth/log-in",
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setCookie("auth_cookie", response.data.token, {
          maxAge: 24 * 60 * 60 * 1000,
          secure: true,
          // httpOnly: true,
          sameSite: "none",
        });
        setAuthState({
          loading: false,
          error: null,
        });
        router.push("/dashboard");
      }
    } catch (error: any) {
      setAuthState({
        loading: false,
        error: error,
      });
      console.log(error);
    }
  };

  return {
    signUp,
    logIn,
  };
};

export default useAuth;
