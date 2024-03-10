"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { useFormStatus, useFormState } from "react-dom";

type userDataType = {
  name: string;
  email: string;
  password: string;
};

const page = () => {
  const [userData, setUserData] = useState<userDataType>({
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

  const authenticate = () => {
    console.log("userData: ", userData);
  };

  const pending = useFormStatus();

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  console.log("errorMessage: ", errorMessage);

  return (
    <div className="h-full flex flex-col items-center">
      <form
        action={dispatch}
        className="flex flex-col gap-5 w-[100%] md:w-[50%] bg-black/20 p-2 rounded mt-[10%]"
      >
        <h1 className="text-2xl font-semibold ">Register🪴</h1>
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
        <Button
          disabled={pending ? true : false}
          type="submit"
          variant="secondary"
        >
          SUBMIT🚇
        </Button>
      </form>
    </div>
  );
};

export default page;
