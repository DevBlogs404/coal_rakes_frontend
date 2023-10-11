"use client";
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
}

interface State {
  token: string | null;
}

// interface AuthState extends State {
//   setAuthState: React.Dispatch<React.SetStateAction<State>>;
// }
export const AuthenticationContext = createContext<State>({
  token: null,
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    token: null,
  });

  const token = localStorage.getItem("token");

  if (token) {
    setAuthState({
      token: token,
    });
  } else {
    setAuthState({
      token: null,
    });
  }

  // const fetchUser = async () => {
  //   const response = await axios.post("http://localhost:6969/api/v1/auth/me", {
  //     headers: {
  //       autherization: `Bearer ${token}`,
  //     },
  //     cookies:{

  //     }
  //   });
  // };

  return (
    <AuthenticationContext.Provider value={{ ...authState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
