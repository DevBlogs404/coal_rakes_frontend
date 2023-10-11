"use client";
import { Inputs } from "../../types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const useAuth = () => {
  const router = useRouter();

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
      console.log(response);

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
    try {
      let response = await axios.post(
        "http://localhost:6969/api/v1/auth/log-in",
        { email, password },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      // const token =
      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    signUp,
    logIn,
  };
};

export default useAuth;
