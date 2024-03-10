"use client";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { registerUserDataType } from "@/lib/definations";
import { AxiosError } from "axios";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

const page = () => {
  const [userData, setUserData] = useState<registerUserDataType>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const [error, setError] = useState("");

  const submitForm = async () => {
    try {
      const res = await axiosInstance.post("/user/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      setError(res?.data.data);
    } catch (error: any | AxiosError) {
      const errorMessage = error?.response?.data.error;
      setError(errorMessage);
    }
  };

  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex flex-col gap-5 w-[100%] md:w-[50%] bg-black/20 p-2 rounded mt-[10%]">
        <h1 className="text-2xl font-semibold ">Register🪴</h1>
        <h1 className="text-red-700">{error}</h1>
        <input
          className="text-xl px-2 py-1 rounded outline-none text-black"
          placeholder="Name...🧑‍🦰"
          type="text"
          name="name"
          id="name"
          value={userData.name}
          onChange={handleChange}
        />
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
            Already have an account?{" "}
            <Link href="/login" className="text-red-600">
              Login
            </Link>
          </p>
        </div>
        <Button onClick={submitForm} variant="secondary">
          SUBMIT🚇
        </Button>
      </div>
    </div>
  );
};

export default page;
