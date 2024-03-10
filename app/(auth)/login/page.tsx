"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

  const submitForm = () => {
    console.log("userData: ", userData);
  };

  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex flex-col gap-5 w-[100%] md:w-[50%] bg-black/20 p-2 rounded mt-[10%]">
        <h1 className="text-2xl font-semibold ">Login🪴</h1>
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
