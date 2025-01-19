"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { Rolestype } from "@/app/types/next-auth";
import { updateSessionWithRole } from "@/app/actions/session/updateSessionWithRole";
import { useSession } from "next-auth/react";
import SignupWithGoogle from "@/app/actions/signup/SignupWithGoogle";
import type { SignupWithGoogleReturnType } from "@/app/actions/signup/SignupWithGoogle";
const roles = [
  {
    title: "Gym Owner",
    description: "Manage your gym facilities and operations",
    value: "owner",
  },
  {
    title: "Trainer",
    description: "Manage your clients and training sessions",
    value: "trainer",
  },
  // {
  //   title: "Sales",
  //   description: "Access your sales plans and track progress",
  //   value: "sales",
  // },
];

export default function SelectRole() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { data: session, update } = useSession();
  const router = useRouter();

  const handleRoleSelect = async (role: string) => {
    setSelectedRole(role);
    setLoading(true);
    console.log("role is this ", role);
    try {
      await new Promise(async (resolve) => {
        if (session?.user?.name && session?.user?.email) {
          const response: SignupWithGoogleReturnType = await SignupWithGoogle(
            session?.user?.name,
            session?.user?.email,
            role as "owner" | "trainer" | "sales"
          );
          if (response && response.name && response.role) {
            const result = await updateSessionWithRole(
              response.role as Rolestype,
              update
            );
            resolve(result);
          }
        }
      });

      router.push(`/${role}dashboard`);
    } catch (error) {
      console.error("Error selecting role:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white text-gray-800 border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Select Your Role
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <AnimatePresence>
            {roles.map((role, index) => (
              <m.div
                key={role.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 
                    ${
                      selectedRole === role.value
                        ? "border-blue-500 bg-blue-50"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }
                    ${loading ? "pointer-events-none opacity-50" : ""}`}
                  onClick={() => handleRoleSelect(role.value)}
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {role.title}
                    </h3>
                    <p className="text-gray-600">{role.description}</p>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </AnimatePresence>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Setting up your account...</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
