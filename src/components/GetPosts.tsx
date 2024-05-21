"use client";
import React from "react";
import { acceptErrand } from "@/app/actions/auth.actions"; // Adjust the import path as needed
import { toast } from "./ui/use-toast";

interface PostProps {
  id: string;
  title: string;
  description: string;
  user: {
    firstName: string;
    lastName: string;
  } | null;
  dateCreated: Date;
  status: string;
  payment: string;
}

export default function GetPosts({
  postArray,
  currentUserId,
}: {
  postArray: PostProps[];
  currentUserId: string;
}) {
  const handleAcceptErrand = async (postId: string) => {
    try {
      await acceptErrand(postId, currentUserId);
      toast({
        variant: "default",
        description: "Message sent to the User",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to Accept Errand",
      });
    }
  };

  return (
    <div>
      {postArray.map((postArrays) => (
        <div
          key={postArrays.id}
          className="w-full flex items-center justify-center"
        >
          <div className="rounded-xl border p-5 shadow-md w-9/12 bg-white my-5">
            <div className="flex w-full items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-3">
                <div className="text-lg font-bold text-slate-700">
                  {postArrays.user?.firstName} {postArrays.user?.lastName}
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">
                  {postArrays.status}
                </div>
                <div className="text-xs text-neutral-500">
                  {postArrays.dateCreated.toUTCString()}
                </div>
                <div className="flex">
                  <p className="px-3 py-1 text-md font-semibold">Payment: </p>
                  <p className="rounded-2xl border bg-yellow-400 px-3 py-1 text-md font-semibold">
                    ₱{postArrays.payment}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 mb-6">
              <div className="mb-3 text-3xl font-bold">{postArrays.title}</div>
              <div className="text-sm text-neutral-600">
                {postArrays.description}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-slate-500">
                <div className="flex space-x-4 md:space-x-8">
                  {postArrays.status === "Available" && (
                    <button
                      onClick={() => handleAcceptErrand(postArrays.id)}
                      className="bg-[#ffa607cc] hover:bg-amber-400 text-black font-semibold rounded-full py-2 px-4 w-full h-10"
                    >
                      Accept Errand
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
