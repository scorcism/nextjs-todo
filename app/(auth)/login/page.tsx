"use client";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

type userDataType = {
  email: string;
  password: string;
};

const page = () => {
  const [userData, setUserData] = useState<userDataType>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const router = useRouter();

  
  const [error, setError] = useState("");
  const submitForm = async () => {
    try {
      const res = await axiosInstance.post("/user/login", {
        email: userData.email,
        password: userData.password,
      });
      setError(res?.data.message);
      router.push("/home", { scroll: false });
    } catch (error: any | AxiosError) {
      const errorMessage = error?.response?.data.error;
      setError(errorMessage);
    }
  };

  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex flex-col gap-5 w-[100%] md:w-[50%] bg-black/20 p-2 rounded mt-[10%]">
        <h1 className="text-2xl font-semibold ">Login🪴</h1>
        <h1 className="text-red-600">{error}</h1>
        <input
          className="text-xl px-2 py-1 rounded outline-none text-black"
          placeholder="Email...🍰"
          type="text"
          name="email"
          id="email"
          value={userData.email}
          onChange={handleChange}
        />
        <input
          className="text-xl px-2 py-1 rounded outline-none text-black"
          placeholder="Password...🔏"
          type="text"
          name="password"
          id="password"
          value={userData.password}
          onChange={handleChange}
        />

        <div>
          <p>
            New here?{" "}
            <Link href="/register" className="text-red-600">
              Register
            </Link>
          </p>
        </div>
        <Button variant="secondary" onClick={submitForm}>
          SUBMIT🚇
        </Button>
      </div>
    </div>
  );
};

export default page;
