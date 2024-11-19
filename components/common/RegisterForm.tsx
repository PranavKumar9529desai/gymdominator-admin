import React from "react";
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
import { Card, CardContent, CardTitle } from "../ui/card";
// form schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 4 characters.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function OnSubmit(values: z.infer<typeof formSchema>) {
    // do db check here
    console.log("values");
  }
  return (
    <>
      <Card className=" px-20 py-10 ">
        <CardTitle className="text-center text-3xl "> Registert Form</CardTitle>
        <CardContent className="px-10 py-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(OnSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="....." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button  className="w-full mt-5"type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
