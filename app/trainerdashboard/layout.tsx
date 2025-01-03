import React from "react";
import SidebarGym from "./sidebar";
import BottomNavigation from "./bottomNavigation";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex ">
        {/* sidebarj*/}
        <div className="w-[350px]  hidden lg:block">
          <SidebarGym />
        </div>

        <div className="block lg:hidden">
          <BottomNavigation />
        </div>
        {/* another componenth */}
        <div className="w-full h-screen overflow-auto">{children}</div>
      </div>
    </>
  );
}
