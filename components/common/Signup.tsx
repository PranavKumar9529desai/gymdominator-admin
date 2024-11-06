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
      redirect: true,
    });
    console.log("Form submitted");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                placeholder="johndoe"
                className="pl-8"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="pl-8"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className="pl-8"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={setRole} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GYMOWNER">Gym Owner</SelectItem>
                <SelectItem value="TRAINER" disabled>
                  Trainer
                </SelectItem>
                <SelectItem value="SALES" disabled>
                  Sales
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* {role && (
            <div className="space-y-2">
              <Label htmlFor="gym">Gym</Label>
              <Select onValueChange={setGym} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your gym" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gym1">Fitness First</SelectItem>
                  <SelectItem value="gym2">Gold's Gym</SelectItem>
                  <SelectItem value="gym3">24 Hour Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {gym && (
            <div className="space-y-2">
              <Label htmlFor="gymToken">Gym Token</Label>
              <div className="relative">
                <Key className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="gymToken"
                  placeholder="Enter gym token"
                  className="pl-8"
                  required
                />
              </div>
            </div>
          )} */}
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={() => signIn("google")}
        >
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign up with Google
        </Button>
      </CardContent>
    </Card>
  );
}
