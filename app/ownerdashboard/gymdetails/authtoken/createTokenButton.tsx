"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { sessionType } from "@/app/actions/gym/FetchGymDetailsSA";
import CreateAuthToken from "@/app/actions/gym/Token/CreateAuthToken";

interface CreateTokenButtonProps {
  session: sessionType;
  onTokenCreated: (token: string) => void;
}

export default function CreateTokenButton({ session, onTokenCreated }: CreateTokenButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const result = await CreateAuthToken({ session });
      if (result.success && result.token) {
        onTokenCreated(result.token);
      }
    } catch (error) {
      console.error("Failed to create token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleClick} 
      disabled={isLoading}
    >
      {isLoading ? "Creating..." : "Generate Token"}
    </Button>
  );
}