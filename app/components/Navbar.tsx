"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { deleteCookie } from "cookies-next";
import { AuthenticationContext } from "../context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { data, setAuthState } = useContext(AuthenticationContext);

  return (
    <nav className="max-w-screen flex items-center justify-between p-4">
      <Link href={"/"} className="text-3xl font-bold">
        Logo
      </Link>
      <h2>{data?.firstName}</h2>
      <div>
        {data === null && (
          <Button
            className="mr-4"
            onClick={() => router.replace("/auth/sign-up")}
          >
            Sign-Up
          </Button>
        )}

        {data !== null ? (
          <>
            <Button
              variant={"destructive"}
              onClick={() => {
                deleteCookie("auth_cookie");
                setAuthState({
                  data: null,
                  error: null,
                  loading: false,
                });
                router.replace("/");
              }}
            >
              Log-Out
            </Button>
          </>
        ) : (
          <Button
            variant={"destructive"}
            onClick={() => router.replace("/auth/sign-in")}
          >
            Log-In
          </Button>
        )}
      </div>
    </nav>
  );
}
