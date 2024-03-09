import App from "@/app/(pages)/(home)/page";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <>
      <App />
      <Toaster richColors closeButton/>
    </>
  );
}
