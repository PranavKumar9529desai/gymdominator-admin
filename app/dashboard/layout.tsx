import React from "react";
import SidebarGym from "@/components/sidebar";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex ">
        {/* sidebar is here */}
        <div className="w-[300px] ">
          <SidebarGym />
        </div>
        {/* another componenth */}
        <div className="w-full h-screen overflow-auto">{children}</div>
      </div>
    </>
  );
}
