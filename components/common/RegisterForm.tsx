"use client";
import React, { useState, useTransition } from "react";
import {
  Form,
  FormDescription,
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
import SignupSA, {
  UserExistsResponse,
  UserExistsSA,
} from "@/app/actions/SignupSA";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Lock, Mail, User, UserRoundCogIcon } from "lucide-react";
import { signIn } from "next-auth/react";

// form schema
const Role = z.enum(["trainer", "gymOwner"]);

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "gymOwner",
    },
  });

  const {
    formState: { errors },
  } = form; // Access form errors
  // very simple flow the if trainer or sales then if they need to feel the gym id it is unique id crewate by the database
  // now let only handle the gymowner register
  async function OnSubmit(values: z.infer<typeof formSchema>) {
    let { email, password, name, role } = values;
    console.log("role from the values is this", values.role);
    startTransition(async () => {
      let response: UserExistsResponse = await UserExistsSA(
        role,
        email,
        name,
        password
      );
      seterror(response.msg);
      if (response.user != false) {
        // meaing thr user object returned by the user is not empty
        // so we can now creatte the user here
        settype("fail");
      } else {
        // @ts-ignore
        let response: {
          msg: string;
          user: {
            name: string;
            email: string;
          };
        } = await SignupSA(role, name, email, password);
        settype("success");
        console.log("response after the user is created ", response);
        try {
          console.log("from the response user details are", email, name, role);
          signIn("credentials", {
            email,
            password,
            role,
            name,
            redirectTo: "/",
          });
        } catch (error) {
          console.log("signin failed due to ", error);
        }
      }
    });
  }

  return (
    <>
      <Card className=" py-5 min-w-96 ">
        <CardHeader>
          <CardTitle className="text-center text-3xl ">
            {" "}
            Register Form
          </CardTitle>
        </CardHeader>
        <CardContent className="  ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(OnSubmit)}
              className="flex flex-col  gap-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  const hasError = !!errors.email;
                  return (
                    <FormItem>
                      <Mail
                        className={`w-4 h-4 inline-flex mr-1 ${
                          hasError ? "text-red-400" : " "
                        }`}
                      />
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your@email.com"
                          {...field}
                          type="email"
                          disabled={ispending}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  const hasError = !!errors.name;
                  return (
                    <FormItem className="">
                      <User
                        className={`w-4 h-4 inline-flex mr-1 ${
                          hasError ? "text-red-400" : " "
                        }`}
                      />
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="....."
                          {...field}
                          disabled={ispending}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  const hasError = !!errors.password;
                  return (
                    <FormItem>
                      <Lock
                        className={`w-4 h-4 inline-flex mr-1 ${
                          hasError ? "text-red-400" : " "
                        }`}
                      />
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="......"
                          {...field}
                          disabled={ispending}
                          type="password"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => {
                  const hasError = !!errors.role;

                  return (
                    <FormItem>
                      <UserRoundCogIcon
                        className={`w-4 h-4 inline-flex mr-1 ${
                          hasError ? "text-red-400" : " "
                        }`}
                      />
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                          disabled={ispending}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gymOwner">Gym Owner</SelectItem>
                            <SelectItem value="trainer">Trainer</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="">
                {type ? (
                  <div className="mt-2 h-8  ">
                    {type == "fail" ? (
                      <FormError
                        FormErrorProps={{
                          message: error as string,
                          type: "fail",
                        }}
                      />
                    ) : (
                      <FormError
                        FormErrorProps={{
                          message: error as string,
                          type: "success",
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <Button
                className="w-full mt-5"
                type="submit"
                disabled={ispending}
              >
                {ispending ? "Submitting" : "Submit"}
              </Button>

              <FormMessage />
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
