"use client";
import React, { useState } from "react";
import { signOut } from "@/app/actions/auth.actions";

export default function NavBar() {
  return (
    <main className=" w-full bg-gray-100">
      <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2">
        <div className="flex items-center space-x-2 tracking-wider">
          <div>Logo</div>
        </div>

        <div className="flex items-center space-x-8">
          <nav className="flex items-center space-x-10 text-lg">
            <a
              href="/homepage/dashboard"
              className="transition hover:text-blue-600"
            >
              Dashboard
            </a>
            <a
              href="/homepage/inbox"
              className="transition hover:text-blue-600"
            >
              Inbox
            </a>
            <a
              href="/homepage/transaction"
              className="transition hover:text-blue-600"
            >
              Transaction
            </a>
          </nav>
        </div>

        <div>
          <button type="button" className="w-fit flex flex-row justify-between">
            <svg
              className="h-6 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            <div className="" onClick={async () => await signOut()}>
              Log Out
            </div>
          </button>
        </div>
      </header>
    </main>
  );
}
