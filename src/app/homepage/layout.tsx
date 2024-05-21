import HomeLayout from "@/components/HomeLayout";
import { validateRequest } from "@/database/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/sign-in");
  }

  return <HomeLayout>{children}</HomeLayout>;
}
