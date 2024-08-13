"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const VerifyemailPage = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get("token");

    setToken(Array.isArray(urlToken) ? urlToken[0] : urlToken || "");
  }, [searchParams]);

  const onVerifyEmail = async () => {
    try {
      const apiResponse = await axios.post("/api/users/verifyemail", { token });
      if (apiResponse.status === 200 && apiResponse.data.success === true) {
        setIsVerified(true);
      }
    } catch (error) {
      console.log("🚀 ~ onVerifyEmail ~ error:", error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center m-8">
      {isVerified ? (
        <>
          <div>
            <h2>
              You are verified! Please{" "}
              <Link href="/login" className="text-blue-700">
                click here
              </Link>
              to Login!
            </h2>
          </div>
        </>
      ) : (
        <>
          <h3>Please verify your identity by clicking below button!</h3>
          <button
            onClick={onVerifyEmail}
            className="bg-blue-500 rounded-md p-4 "
          >
            {token ? "Click Me to verify!" : "No token found!"}
          </button>
        </>
      )}
    </div>
  );
};

export default VerifyemailPage;
