"use client";
import { useState, useEffect, useTransition, useContext } from "react";
import { getCookie } from "cookies-next";

import SidingManagement from "../slideManagement/page";
import RakeManagement from "../rakeManagement/page";
import Allocation from "../Locations/page";
import HistoryLogs from "../HistoryLogs/page";
import { useRouter } from "next/navigation";
import { AuthenticationContext } from "@/app/context/AuthContext";
import axios from "axios";

export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState("siding");
  const [isPending, startTransition] = useTransition();
  const { setAuthState, data, loading, error } = useContext(
    AuthenticationContext
  );

  const token = getCookie("auth_cookie");

  function setNextTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  const getUser = async () => {
    try {
      let response = await axios.get("http://localhost:6969/api/v1/auth/user", {
        withCredentials: true,
      });
      setAuthState({
        data: response.data.user,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState({
        data: null,
        loading: false,
        error: error,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
    getUser();
  }, [token]);

  if (loading) {
    return <div>loading..</div>;
  }
  if (error) {
    return <div>Something went wrong!!..</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">Siding Admin Dashboard</h1>
      {/* Navigation Tabs */}
      <div className="mt-4">
        <div
          className={`cursor-pointer inline-block p-2 ${
            tab === "siding" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setNextTab("siding")}
        >
          Siding Management
        </div>
        <div
          className={`cursor-pointer inline-block p-2 ml-2 ${
            tab === "rake" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setNextTab("rake")}
        >
          Rake Management
        </div>
        <div
          className={`cursor-pointer inline-block p-2 ml-2 ${
            tab === "allocation" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setNextTab("allocation")}
        >
          Allocation
        </div>
        <div
          className={`cursor-pointer inline-block p-2 ml-2 ${
            tab === "history" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setNextTab("history")}
        >
          History & Logs
        </div>
      </div>
      {/* Content Based on Selected Tab */}
      <div className="mt-4">
        {tab === "siding" && <SidingManagement />}
        {tab === "rake" && <RakeManagement />}
        {tab === "allocation" && <Allocation />}
        {tab === "history" && <HistoryLogs />}
      </div>
    </div>
  );
}
