"use client"; // This is necessary to write as by default Next js render server side and this react components render client side
// so if we don't write this it will give error in Next
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData.email.length > 0 && userData.password.length > 8) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [userData]);

  const onLogin = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const apiResponse = await axios.post("/api/users/login", userData);
      console.log("🚀 ~ onLogin ~ apiResponse:", apiResponse);
      console.log("apiResponse.data", apiResponse.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("🚀 ~ onLogin ~ error:", error);
      console.error("Login failed!");
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center text-lg font-semibold mb-4">
          Already Registered? Please Login and Explore!
        </div>
        <form className="max-w-md mx-auto">
          <div className="flex flex-col gap-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) =>
                setuserData({ ...userData, email: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={userData.password}
              onChange={(e) =>
                setuserData({ ...userData, password: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              onClick={onLogin}
              disabled={btnDisabled}
              className={`mt-2 p-3 w-full rounded-md font-semibold transition-colors duration-300 ${
                btnDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
              }`}
            >
              {loading ? "Processing...." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
