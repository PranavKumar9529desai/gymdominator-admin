"use client";
import React, { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import FormError from "../ui/form-error";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Lock, Mail, User, UserRoundCogIcon, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { UserExistsFormat } from "@/app/actions/signup/SignUpWithCrendentails";
import { UserExistsSA } from "@/app/actions/signup/SignUpWithCrendentails";
import GoogleButton from "../ui/googleButton";

// type roleType = "owner" | "trainer" | "sales";
// form schema
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .max(40, { message: "Email must be at most 40 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .max(40, { message: "Password must be at most 40 characters." }),
  name: z
    .string()
    .min(4, { message: "Username must be at least 4 characters." })
    .max(40, { message: "Username must be at most 40 characters." }),
  role: z.enum(["owner", "trainer", "sales"], {
    required_error: "Please select a role",
  }),
});

export default function RegisterForm() {
  const [error, seterror] = useState<string>("");
  const [type, settype] = useState<"success" | "fail" | null>();
  const [ispending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: undefined,
    },
  });

  const {
    formState: { errors },
  } = form;


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("form is submitted values", values);
    const { email, password, name, role } = values;
    startTransition(async () => {
      const response: UserExistsFormat = await UserExistsSA(
        email,
        name,
        password
        
      );
      if ( response && response.msg && response.user) {
        settype("fail");
        seterror(response.msg);
      } else {
        settype("success");
        seterror("User created Successfully");
        await signIn("credentials", {
          name,
          password,
          email,
          role,
        });
        console.log("user is created and signed in", response);
      }
    });
  }

  async function handleGoogleSubmit() {
    console.log("role from the form", form.getValues("role"));
   
    startTransition(async () => {
      const result = await signIn("google", {
        redirect: true,
        redirectTo: "/selectrole",
      });
      console.log("result from the google signin", result?.status);
    });
     
    // when the user sigin is complete coimplete then we allowe user to select the role
  }





return (

  <>
    <Card className="w-full max-w-md mx-auto shadow-xl rounded-xl border-0 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm">
      <CardHeader className="space-y-3 pb-8">
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Create Account
        </CardTitle>
        <p className="text-sm text-center text-muted-foreground">
          Enter your details to create your account
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="flex items-center space-x-2 text-sm font-medium">
                    <User
                      className={`w-4 h-4 ${errors.name
                        ? "text-destructive"
                        : "text-primary/70"
                        }`}
                    />
                    <span>Username</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      disabled={ispending}
                      type="text"
                      className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="flex items-center space-x-2 text-sm font-medium">
                      <Mail
                        className={`w-4 h-4 ${errors.email
                          ? "text-destructive"
                          : "text-primary/70"
                          }`}
                      />
                      <span>Email</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        {...field}
                        type="email"
                        disabled={ispending}
                        className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="flex items-center space-x-2 text-sm font-medium">
                      <Lock
                        className={`w-4 h-4 ${errors.password
                          ? "text-destructive"
                          : "text-primary/70"
                          }`}
                      />
                      <span>Password</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          {...field}
                          disabled={ispending}
                          type={showPassword ? "text" : "password"}
                          className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-1 w-full mt-4">
                  <FormLabel className="flex items-center space-x-2 text-sm font-medium">
                    <UserRoundCogIcon
                      className={`w-4 h-4 ${
                        errors.role ? "text-destructive" : "text-primary/70"
                      }`}
                    />
                    <span>Role</span>
                  </FormLabel>
                  <Select
                    
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    disabled={ispending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors">
                        <SelectValue placeholder="Select your Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="owner">Gym Owner</SelectItem>
                      <SelectItem value="trainer">Trainer</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button
              className="w-full font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg"
              type="submit"
              disabled={ispending}
              size="lg"
            >
              {ispending ? (
                <div className="flex items-center space-x-2">
                  <span className="animate-spin">⚪</span>
                  <span>Registering...</span>
                </div>
              ) : (
                "Create Account"  
              )}
            </Button>
          </form>
        </Form>
{
      error && type ?
          <FormError FormErrorProps={{message: error, type: type as "success" | "fail" }} />
          : null
}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted-foreground/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <GoogleButton handleSubmit={handleGoogleSubmit} />
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/signin"
            className=" hover:underline font-medium text-blue-600"
          >
            Sign In
          </a>
        </div>
      </CardContent>
    </Card>
    </>
  )}   