"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  ClipboardList,
  UserCheck,
  Dumbbell,
  ChevronDown,
  Eye,
  UserPlus,
  CalendarCheck,
  QrCode,
  Route,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type Route = "addworkout" | "assignworkout" | "attendance";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  route: Route;
}

interface SubRoute {
  icon: React.ReactNode;
  label: string;
  route: string;
  onClick: () => void;
}

export default function BottomNavigation() {
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [isActive, setisActive] = useState<Route>();
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  // TODO if possible only show the unassigned users

  const router = useRouter();
  let currentPath = usePathname();
  const navItems: NavItem[] = [
    {
      icon: <Dumbbell className="h-6 w-6" />,
      label: "Workouts",
      route: "addworkout",
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      label: "Assignments",
      route: "assignworkout",
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      label: "Attendance",
      route: "attendance",
    },
  ];

  const attendanceSubRoutes: SubRoute[] = [
    {
      icon: <CalendarCheck className="h-6 w-6 text-indigo-500" />,
      label: "Today's Attendance",
      route: "todaysattendance",
      onClick: () => console.log("Navigate to Today's Attendance"),
    },
    {
      icon: <QrCode className="h-6 w-6 text-indigo-500" />,
      label: "Show Qr",
      route: "showqr",
      onClick: () => console.log("Navigate to Show QR"),
    },
  ];

  const openSubRoutes = (route: Route) => {
    setIsOpening(true);
    setActiveRoute(route);
    setTimeout(() => {
      setIsOpening(false);
    }, 200); // Quick opening animation
  };

  const closeSubRoutes = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveRoute(null);
      setIsClosing(false);
    }, 300); // Match this with the CSS transition time
  };

  const handleNavClick = (route: Route) => {
    if (activeRoute === route) {
      closeSubRoutes();
    } else {
      openSubRoutes(route);
    }
    // route which has subroutes that routes changed after the user selects the route the subroutes
    if (route !== "attendance") {
      console.log(`Navigate to ${route}`);
      router.push(`/trainerdashboard/${route}`);
    }
  };

  const renderSubRoutes = (subRoutes: SubRoute[], title: string) => (
    <div
      className={cn(
        "absolute left-0 right-0 bg-white p-4 rounded-t-lg shadow-lg transition-all duration-300 ease-in-out",
        isClosing ? "bottom-0 opacity-0" : "bottom-full opacity-100",
        isOpening ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      )}
    >
      <div className="flex justify-center mb-2">
        <Button variant="ghost" onClick={closeSubRoutes} className="p-0">
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </Button>
      </div>
      <h2 className="text-xl font-bold text-center mb-4">{title}</h2>
      <div className="space-y-2">
        {subRoutes.map((subRoute, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex items-center justify-start w-full p-4 bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            onClick={() => {
              subRoute.onClick();
              router.push(`/trainerdashboard/${activeRoute}/${subRoute.route}`);
              closeSubRoutes();
            }}
          >
            {subRoute.icon}
            <span className="ml-4 text-sm font-medium">{subRoute.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    console.log("active route is ", activeRoute);
    let routefrompath = currentPath.split("/")[2];
    console.log(routefrompath);
    // @ts-ignore`
    setisActive(routefrompath);
  }, [activeRoute, currentPath]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <div className="relative">
        {activeRoute === "attendance" &&
          renderSubRoutes(attendanceSubRoutes, "Attendance Options")}
      </div>
      <nav className="flex justify-around items-center h-16 bg-gray-700">
        {navItems.map((item) => (
          <button
            key={item.route}
            className={cn(
              "flex flex-col items-center justify-center h-full w-full text-white",
              isActive === item.route ? "bg-blue-700" : ""
            )}
            onClick={() => handleNavClick(item.route)}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
