import App from "../app/(pages)/home/page";
import { Toaster } from "sonner";
import React from "react";

export default function Home() {
  return (
    <>
      <App />
      <Toaster richColors closeButton />
    </>
  );
}
