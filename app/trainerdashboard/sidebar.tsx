"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronRight,
  LogOut,
  ChevronDown,
  Dumbbell,
  CalendarCheck,
  UtensilsCrossedIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import IconImage from "@/app/assests/gym-manager.webp";

interface MenuItem {
  name: string;
  icon: React.ElementType;
  label: string;
  link: string;
  subItems?: { name: string; label: string; link: string }[];
}

export const menuItems: MenuItem[] = [
  {
    name: "Workouts",
    label: "workouts",
    icon: Dumbbell,
    link: "/trainerdashboard/workouts",
    subItems: [
      {
        name: "Create Workouts",
        label: "addworkout",
        link: "/workouts/addworkout",
      },
      {
        name: "Assign Workout",
        label: "assignworkout",
        link: "/workouts/assignworkout",
      },
    ],
  },
  {
    name: "Diet",
    label: "diet",
    icon: UtensilsCrossedIcon,
    link: "/trainerdashboard/diet",
    subItems: [
      {
        name: "Create diet-plan",
        label: "createdietplan",
        link: "/diet/createdietplan",
      },
      {
        name: "Assign Diet plan",
        label: "assigndietplan",
        link: "/diet/assigndietplan",
      },
    ],
  },
  {
    name: "Attendance",
    icon: CalendarCheck,
    label: "attendance",
    link: "/trainerdashboard/attendance",
    subItems: [
      {
        name: "Today's Attendance",
        label: "todaysattendance",
        link: "/attendance/todaysattendance",
      },
      {
        name: "Show QR",
        label: "showqr",
        link: "/attendance/showqr",
      },
    ],
  },
];

export default function SideBar() {
  const [activePage, setActivePage] = useState<string>("Gym Details");
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const handleItemClick = (item: MenuItem) => {
    setActivePage(item.label);
    if (item.subItems) {
      setOpenMenus((prev) => ({ ...prev, [item.label]: !prev[item.label] }));
    } else {
      router.push(`/trainerdashboard/${item.label}`);
    }
  };

  const handleSubItemClick = (
    item: MenuItem,
    subItem: { name: string; label: string }
  ) => {
    setActivePage(subItem.label);
    router.push(`/trainerdashboard/${item.label}/${subItem.label}`);
  };

  const isActiveParent = (item: MenuItem) => {
    return item.subItems
      ? item.subItems.some((subItem) => subItem.label === activePage) ||
          (!openMenus[item.label] && activePage === item.label)
      : activePage === item.label;
  };

  return (
    <div className="flex flex-col bg-slate-900 text-white w-64 h-screen">
      <div className="px-4 w-full flex items-center justify-center ">
        <Image
          src={IconImage}
          alt="Gym Manager Icon"
          className="rounded-full "
        />
      </div>

      <ScrollArea className="flex-grow">
        <nav className="px-4 py-2">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start transition-colors duration-200 ${
                    isActiveParent(item)
                      ? "!bg-blue-700 hover:text-white hover:bg-blue-700"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                  {item.subItems &&
                    (openMenus[item.label] ? (
                      <ChevronDown className="w-5 h-5 ml-auto" />
                    ) : (
                      <ChevronRight className="w-5 h-5 ml-auto" />
                    ))}
                </Button>
                {item.subItems && openMenus[item.label] && (
                  <ul className="ml-6 mt-2 space-y-2">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start  transition-colors duration-200 ${
                            activePage === subItem.label
                              ? "!bg-blue-700 text-white hover:text-white hover:bg-blue-700 "
                              : "hover:bg-gray-800 hover:text-white"
                          }`}
                          onClick={() => handleSubItemClick(item, subItem)}
                        >
                          {subItem.name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>

      <div className="p-4">
        <button className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-800 rounded-lg transition-colors duration-200">
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
