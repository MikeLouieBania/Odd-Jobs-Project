import React from "react";
import NavBar from "./ui/NavBar";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-auto">
        <NavBar />
      </div>
      <div className="w-auto">{children}</div>
    </div>
  );
}

export default HomeLayout;
