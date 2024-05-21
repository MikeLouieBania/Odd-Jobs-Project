"use client";

import React, { useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { sendPayment } from "@/app/actions/auth.actions";

interface ErrandProps {
  id: string;
  title: string;
  description: string;
  userId: string | null;
  payment: string;
  dateCreated: Date;
  status: string | null;
  assignedUserId: string | null;
  assignedUser: {
    firstName: string;
    lastName: string;
  } | null;
}

export default function TransactionForm({ errand }: { errand: ErrandProps[] }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      receiverAccountNumber: "",
      senderAccountNumber: "",
      amount: "",
    },
  });

  async function onSubmit(values: z.infer<typeof transactionSchema>) {
    const res = await sendPayment(values);
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

  useEffect(() => {
    if (errand.length > 0) {
      form.setValue("amount", errand[0].payment);
      form.setValue("errandId", errand[0].id);
    }
  }, [errand, form]);

  return (
    <div className="py-12">
      <div className="h-full w-full mx-auto sm:px-6 lg:px-8">
        <h1 className="text-4xl">Transaction Page</h1>
        <p className="text-md mb-5">give back on those who help you.</p>
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div>
            {errand.map((errands) => (
              <div
                key={errands.id}
                className="p-6 border-2 rounded-lg border-gray-500 my-5"
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex text-3xl mb-5">
                      <h1>Transaction Code:</h1>
                      <Input
                        disabled
                        value={errands.id}
                        className="w-fit text-xl text-black"
                      />
                    </div>
                    <div className="mb-4">
                      <FormField
                        control={form.control}
                        name="receiverAccountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">
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
                            <FormLabel className="font-semibold">
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
                            <FormLabel className="font-semibold">
                              Amount to Pay
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled
                                placeholder="Amount"
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
                      Pay the Bill
                    </Button>
                  </form>
                </Form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
