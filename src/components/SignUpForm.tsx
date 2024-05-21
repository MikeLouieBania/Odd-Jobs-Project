"use client";
import { useState } from "react";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "@/types";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signUp } from "@/app/actions/auth.actions";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      studentNumber: "",
      dept: "",
      address: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    setLoading(true);
    const res = await signUp(values);
    if (res.error) {
      toast({
        variant: "destructive",
        description: "Sign Up Failed",
      });
    } else if (res.success) {
      toast({
        variant: "default",
        description: "Account created successfully",
      });
      router.push("/sign-in");
    }
    setLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full h-full p-4 flex items-center justify-center">
            <div className="bg-gradient-to-br from-orange-100 via-gray-100 to-blue-100 py-6 px-10 sm:max-w-lg w-full rounded-lg">
              <div className="sm:text-3xl text-2xl font-semibold text-center mb-12">
                Registration Form
              </div>
              <div className="">
                <div className="flex flex-row">
                  <div className="mr-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Juan"
                              {...field}
                              className="inline-block he-full w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Dela Cruz"
                            {...field}
                            className="inline-block he-full w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="juandelacruz@gmail.com"
                            {...field}
                            className="inline-block he-full w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row">
                  <FormField
                    control={form.control}
                    name="studentNumber"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Student Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="S01234"
                            {...field}
                            className="inline-block he-full w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="ml-4">
                    <FormField
                      control={form.control}
                      name="dept"
                      render={({ field }) => (
                        <FormItem className="mb-2">
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Filipino"
                              {...field}
                              className="inline-block he-full w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123B Parkway, San Juan"
                            {...field}
                            className="inline-block he-full w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="****"
                            type="password"
                            {...field}
                            className="inline-block he-full w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="****"
                            type="password"
                            {...field}
                            className="inline-block he-full w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-center ">
                  <p className="text-gray-500">Already have an acount? </p>
                  <a href="/sign-in" className="text-sky-600 pl-2">
                    {" "}
                    Sign In
                  </a>
                </div>
                <div className="flex justify-center my-6">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-[#ffa607cc] hover:bg-amber-400 text-black"
                  >
                    {loading ? "Loading..." : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
