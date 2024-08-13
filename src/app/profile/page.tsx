"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface userData {
  username?: string;
}

const profilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<userData>({});

  const getUserDetail = async () => {
    try {
      const apiResponse = await axios.post("/api/users/profile");
      setUserData(apiResponse.data.data);
    } catch (error: any) {
      toast.error(error);
      console.log("🚀 ~ getUserDetail ~ error:", error);
    }
  };

  const onLogout = async () => {
    try {
      const apiResponse = await axios.post("/api/users/logout");
      if (apiResponse.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.log("🚀 ~ onLogout ~ error:", error);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center m-8">
      Hello,{userData ? userData.username : ""}
      <button
        onClick={onLogout}
        className="mt-2 p-3 rounded-md font-semibold transition-colors duration-300 bg-blue-700"
      >
        Log out
      </button>
    </div>
  );
};

export default profilePage;
