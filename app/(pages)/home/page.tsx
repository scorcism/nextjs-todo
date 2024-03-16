"use client";
import Form from "./components/Form";
import React from "react";
const page = () => {
  return (
    <div className="flex w-full h-full items-center flex-col gap-5 overflow-scroll">
      <div className="rounded p-2 bg-black/20 flex flex-col gap-3 mt-[10%] w-[100%] md:w-[50%]">
        <Form />
        {/* <TodoList /> */}
      </div>
    </div>
  );
};

export default page;
