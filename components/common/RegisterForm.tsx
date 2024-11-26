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
import { UserExistsSA } from "@/app/actions/SignupSA";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Lock, Mail, User, UserRoundCogIcon, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { UserExistsFormat } from "@/app/actions/SignupSA";
import { coustomAlert } from "./Alerts/CustomAlerts";

// form schema
const Role = z.enum(["trainer", "gymOwner", "sales"]);

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
  role: Role,
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
      role: "" as "trainer" | "gymOwner" | "sales",
    },
  });

  const {
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let { email, password, name, role } = values;
    startTransition(async () => {
      const response: UserExistsFormat = await UserExistsSA(
        role,
        email,
        name,
        password
      );
      if (response.user) {
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
        console.log("User created successfully:", response.user);
      }
    });
  }

  async function handleGoogleSubmit() {
    console.log("role from the form", form.getValues("role"));
    if (!form.getValues("role")) {
      coustomAlert("error", "Please select Role First");
    }
    await signIn("google", {
      callbackUrl: "/",
      state: JSON.stringify({ role: form.getValues("role") }),
      redirect: true,
    });
  }

  return (
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="flex items-center space-x-2 text-sm font-medium">
                    <User className={`w-4 h-4 ${errors.name ? "text-destructive" : "text-primary/70"}`} />
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
                      <Mail className={`w-4 h-4 ${errors.email ? "text-destructive" : "text-primary/70"}`} />
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
                      <Lock className={`w-4 h-4 ${errors.password ? "text-destructive" : "text-primary/70"}`} />
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
                <FormItem className="space-y-1">
                  <FormLabel className="flex items-center space-x-2 text-sm font-medium">
                    <UserRoundCogIcon className={`w-4 h-4 ${errors.role ? "text-destructive" : "text-primary/70"}`} />
                    <span>Role</span>
                  </FormLabel>
                  <Select
                    required
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    disabled={ispending}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-colors">
                        <SelectValue placeholder="Select your Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gymOwner">Gym Owner</SelectItem>
                      <SelectItem value="trainer">Trainer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            {type && (
              <FormError
                FormErrorProps={{
                  message: error,
                  type: type,
                }}
              />
            )}
           
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
        <Button
          variant="outline"
          className="w-full hover:bg-muted/50 border-muted-foreground/20 transition-colors duration-300"
          onClick={handleGoogleSubmit}
        >
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="github"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Continue with Google
        </Button>
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
  );
}
