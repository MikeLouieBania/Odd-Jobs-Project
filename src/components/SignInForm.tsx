"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "@/types";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/app/actions/auth.actions";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

export default function SignInForm() {
  //Call the image from Cloudinary
  const backgroundImage = new CloudinaryImage("bg-image", {
    cloudName: "di4u5vsww",
  }).resize(fill());

  const logo = new CloudinaryImage("logo", {
    cloudName: "di4u5vsww",
  }).resize(fill());

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const res = await signIn(values);
    if (res.error) {
      toast({
        variant: "destructive",
        description: "Sign In Failed",
      });
    } else if (res.success) {
      toast({
        variant: "default",
        description: "Sign In successfully",
      });
    }
  }
  return (
    <>
      <div className="relative flex h-full w-full ">
        <div className="h-screen w-1/2 ml-12">
          <div className="mx-auto flex h-full flex-col justify-center text-black xl:w-2/3">
            <div className="border-2 border-slate-500 rounded-lg p-6">
              <div>
                <p className="text-2xl text-center">TIPerrands</p>
                <p className="text-center">please login to continue</p>
              </div>
              <div className="my-6">
                <a
                  href="/sign-up"
                  className="text-black font-semibold flex w-full justify-center rounded-3xl border-none bg-gradient-to-r from-[#FEDF81] to-[#ffa607cc] hover:bg-amber-400 sm:p-2"
                >
                  Register to be part of our community
                </a>
              </div>
              <div>
                <fieldset className="border-t border-solid border-gray-600">
                  <legend className="mx-auto px-2 text-center text-sm">
                    Or login if you already have an account
                  </legend>
                </fieldset>
              </div>
              <div className="mt-10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="py-4 px-3 mb-4 rounded-lg">
                      <div className="mb-5">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className=" font-semibold">
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="email"
                                  {...field}
                                  className="inline-block he-full w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="mb-4">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className=" font-semibold">
                                Password
                              </FormLabel>
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
                      <div className="my-4 text-sm text-right text-black">
                        <a href="#" className="hover:underline">
                          Forgot Password?
                        </a>
                      </div>
                      <Button
                        type="submit"
                        className="bg-[#ffa607cc] hover:bg-amber-400 text-black font-semibold rounded-full py-2 px-4 w-full h-10"
                      >
                        Login
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen w-1/2 bg-cover bg-center bg-[url('https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png')]"></div>
      </div>
    </>
  );
}
