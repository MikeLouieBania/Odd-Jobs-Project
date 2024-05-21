"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { errandSchema } from "@/types";
import { createPost } from "@/app/actions/auth.actions";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { revalidatePath } from "next/cache";

interface UserProps {
  userId: string;
}

export default function PostForm({ userId }: { userId: UserProps[] }) {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof errandSchema>>({
    resolver: zodResolver(errandSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { reset } = useForm<z.infer<typeof errandSchema>>({
    resolver: zodResolver(errandSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof errandSchema>) {
    const res = await createPost(userId, values);
    if (!res.success) {
      toast({
        variant: "destructive",
        description: "Failed",
      });
    } else {
      toast({
        variant: "default",
        description: "Success",
      });
      reset();
    }
  }

  return (
    <div className="py-12">
      <div className="h-full w-full mx-auto sm:px-6 lg:px-8">
        <h1 className="text-4xl">Upload your Errand</h1>
        <p className="text-md mb-5">and let other students do it for you.</p>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 border-2 rounded-lg border-gray-500">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" font-semibold">Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="title"
                            {...field}
                            className="inline-block he-full w-full rounded-md bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" font-semibold">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Description"
                            {...field}
                            className="inline-block he-full w-full rounded-md bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
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
                    name="payment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" font-semibold">
                          Set Amount:
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="payment"
                            {...field}
                            className="inline-block he-full w-full rounded-md bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#ff9a15] hover:bg-amber-400 text-black font-semibold rounded-full py-2 px-4 w-full h-10"
                >
                  Post
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
