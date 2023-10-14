"use client";
import { useState, createContext, useEffect } from "react";
import axios from "axios";

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
}

interface State {
  data?: IUser | null;
  loading: boolean;
  error: string | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}
export const AuthenticationContext = createContext<AuthState>({
  data: null,
  loading: false,
  error: null,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchUser = async () => {
    setAuthState({
      data: null,
      loading: true,
      error: null,
    });
    try {
      let response = await axios.get("http://localhost:6969/api/v1/auth/user", {
        withCredentials: true,
      });
      setAuthState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState({
        data: null,
        loading: false,
        error: error,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
