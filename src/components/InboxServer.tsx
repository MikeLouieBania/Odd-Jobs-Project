import React from "react";
import InboxInterface from "@/components/InboxInterface";
import {
  fetchCurrentUserId,
  fetchUsers,
  fetchChats,
  fetchMessages,
} from "@/app/actions/auth.actions";

export default async function InboxServer() {
  const userId = await fetchCurrentUserId();
  const users = await fetchUsers();
  const chats = await fetchChats();
  const initialMessages =
    chats.length > 0 ? await fetchMessages(chats[0].id) : [];

  return (
    <InboxInterface
      userId={userId}
      initialUsers={users}
      initialChats={chats}
      initialMessages={initialMessages}
    />
  );
}
