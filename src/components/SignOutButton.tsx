"use client";

import { useState } from "react";
import { signOut } from "@/app/actions/auth.actions";

export default function SignOut() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div>
      {/* Button to trigger confirmation dialog */}
      <button
        onClick={() => setShowConfirmation(true)}
        className="text-red-500"
      >
        Logout
      </button>

      {/* Confirmation dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-md max-w-md">
            <p className="text-lg text-white mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center ">
              {/* Confirm Logout */}
              <button
                onClick={async () => await signOut()}
                className=" bg-red-500 text-white px-4 py-2 rounded-md mr-20 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Yes
              </button>
              {/* Cancel Logout */}
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
