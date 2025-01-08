"use client";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CustomButton() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    
    if (status === "authenticated" && session?.user?.role) {
      router.push(`/${session.user.role}dashboard`);
    } else {
      router.push("/signin");
    }
  };

  return (
    <button
      className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-[7px] px-10 rounded-full sm:text-lg transition-all duration-200 ease-in-out transform hover:scale-105"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <>
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </>
      )}
    </button>
  );
}
