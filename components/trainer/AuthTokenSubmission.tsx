"use client";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { Loader2 } from "lucide-react";
import { GymAtom, GymAtomType } from "@/app/state/Atoms/gymAtom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { VerifyAuthToken } from "@/app/actions/gym/Token/VerifyAuthToken";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  updateSesionWithGym,
} from "@/app/actions/session/updateSessionWithGym";

export default function AuthTokenSubmission() {
  const { data: session, update } = useSession();
  console.log("session is ", session);
  const router = useRouter();
  const [authToken, setAuthToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const gym: GymAtomType = useRecoilValue(GymAtom);

  const onClose = () => {
    console.log("Close button clicked");
    // Backend call and redirect
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Handle successful submission (e.g., redirect or show success message)
      const response: { msg: string; success: boolean } = await VerifyAuthToken(
        gym,
        authToken
      );
      console.log("response is ", response);
      if (response.success) {
        console.log("auth token is correct");
        const updatedSesion = await updateSesionWithGym(gym, update);
        console.log(
          "updated the session with the gym is from the AuthToken submission is ",
          updatedSesion,
          gym
        );
        router.push("/trainerdashboard");
        onClose();
      } else {
        console.log("auth token is incorrect");
      }
    } catch (error) {
      console.error("Error submitting auth token:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Gym Authentication</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src={gym.img}
              alt={gym.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h3 className="text-lg font-semibold text-center">{gym.name}</h3>
          <p className="text-sm text-muted-foreground text-center">
            Please enter the authentication token provided by the gym owner.
          </p>
          <Input
            type="text"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            placeholder="Enter your auth token"
            className="w-full"
          />
          <Button
            onClick={handleSubmit}
            disabled={loading || !authToken.trim()}
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
