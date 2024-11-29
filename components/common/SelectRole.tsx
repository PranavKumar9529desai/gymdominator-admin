"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Rolestype } from "@/app/types/next-auth";
import { updateSessionWithRole } from "@/app/actions/updateSession";
import { useSession } from "next-auth/react";

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
  {
    title: "Sales",
    description: "Access your sales plans and track progress",
    value: "sales",
  },
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

    try {
      await new Promise(async (resolve) => {
        const result = await updateSessionWithRole(role as Rolestype, update);
        setTimeout(() => {
          resolve(result);
        }, 1500);
      });
      
      router.push(`/${role}dashboard`);
    } catch (error) {
      console.error('Error selecting role:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Select Your Role
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <AnimatePresence>
            {roles.map((role, index) => (
              <motion.div
                key={role.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 
                    ${selectedRole === role.value ? 'border-blue-500 bg-blue-900/20' : 'bg-gray-800 border-gray-700'}
                    ${loading ? 'pointer-events-none opacity-50' : ''}`}
                  onClick={() => handleRoleSelect(role.value)}
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                    <p className="text-gray-400">{role.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Setting up your account...</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}