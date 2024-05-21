// components/InboxInterface.js
"use client";
import React, { useState, useEffect } from "react";
import { fetchMessages, sendMessage } from "@/app/actions/auth.actions";

export default function InboxInterface({
  userId,
  initialUsers,
  initialChats,
  initialMessages,
}: any) {
  const [users, setUsers] = useState(initialUsers);
  const [chats, setChats] = useState(initialChats);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedChat, setSelectedChat] = useState(
    initialChats.length > 0 ? initialChats[0].id : null
  );
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      if (selectedChat) {
        const messagesData = await fetchMessages(selectedChat);
        setMessages(messagesData);
      }
    }

    loadData();
  }, [selectedChat]);

  const handleChatClick = async (chatId: any) => {
    const messagesData = await fetchMessages(chatId);
    setMessages(messagesData);
    setSelectedChat(chatId);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" && selectedChat) {
      await sendMessage(selectedChat, userId, newMessage); // Pass the user ID
      const updatedMessages = await fetchMessages(selectedChat);
      setMessages(updatedMessages);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {chats.map((chat: any) => {
            const user = users.find(
              (user: any) =>
                user.id ===
                (chat.senderId !== userId ? chat.senderId : chat.receiverId)
            );
            console.log(user);
            return (
              <div
                key={chat.id}
                className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                onClick={() => handleChatClick(chat.id)}
              >
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">
            {selectedChat ? `Chat code: ${selectedChat}` : "Select a chat"}
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message: any) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.senderId === userId ? "justify-end" : ""
              }`}
            >
              <div
                className={`flex max-w-96 ${
                  message.senderId === userId
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-500 text-white"
                } rounded-lg p-3 gap-3`}
              >
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
