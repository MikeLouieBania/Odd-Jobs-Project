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
import { transactionSchema } from "@/types";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { sendPayment } from "@/app/actions/auth.actions";

interface UserProps {
  userId: string;
}

export default function PaymentTransaction({
  userId,
}: {
  userId: UserProps[];
}) {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      receiverAccountNumber: "",
      senderAccountNumber: "",
      amount: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof transactionSchema>) {
    const res = await sendPayment(userId, values);
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
                    name="receiverName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" font-semibold">
                          Name of the Receiver
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Receiver Name"
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
                    name="receiverAccountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" font-semibold">
                          Account Number of the Receiver
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Account Number"
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
                    name="senderAccountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" font-semibold">
                          Account Number of the Sender
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Account Number"
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
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" font-semibold">Amount</FormLabel>
                        <FormControl>
                          <Input
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
