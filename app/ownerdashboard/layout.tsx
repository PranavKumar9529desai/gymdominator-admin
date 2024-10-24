import React from "react";
import Sidebar from "./sidebar";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex ">
        {/* sidebar is here */}
        <div className="w-[350px] ">
          <Sidebar />
        </div>
        {/* another componenth */}
        <div className="w-full h-screen overflow-auto">{children}</div>
      </div>
    </>
  );
}
