"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getCookie, deleteCookie, CookieValueTypes } from "cookies-next";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="max-w-screen flex items-center justify-between p-4">
      <Link href={"/"} className="text-3xl font-bold">
        Logo
      </Link>
      <div>
        <Button className="mr-4" onClick={() => router.push("/auth/sign-up")}>
          Sign-Up
        </Button>

        <Button
          variant={"destructive"}
          onClick={() => router.push("/auth/sign-in")}
        >
          Log-In
        </Button>
      </div>
    </nav>
  );
}
