import { getPost } from "@/app/actions/auth.actions";
import GetPosts from "@/components/GetPosts";
import PostForm from "@/components/PostForm";
import { validateRequest } from "@/database/auth";
import React from "react";

export default async function Dashboard() {
  const { user } = await validateRequest();
  const existingUser = user?.id;
  if (!existingUser) {
    throw new Error("User not found");
  }
  const fetchPosts = await getPost();
  return (
    <div className="flex flex-row">
      <div className="w-2/5">
        <PostForm userId={existingUser} />
      </div>
      <div className="w-3/5">
        <GetPosts postArray={fetchPosts} currentUserId={existingUser} />
      </div>
    </div>
  );
}
