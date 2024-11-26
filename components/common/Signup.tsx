"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Mail, Lock, Key } from "lucide-react";
import { signIn } from "next-auth/react";
import RegisterForm from "./RegisterForm";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [gym, setGym] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await signIn("credentials", {
      username,
      password,
      email,
      role,
      gym,
      redirect: true,
    });
    console.log("Form submitted");
  };

  return (
    <>
      <RegisterForm />
    </>
  );
}
